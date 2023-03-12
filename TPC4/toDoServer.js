var http = require('http')
var formTemplates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');
var taskList = {}
var doneList = {}

function markAsDone(date) {
    // move task from taskList to doneList
    doneList[date] = taskList[date];
    delete taskList[date];
}

function markAsNotDone(date){
    // move task from doneList to taskList
    taskList[date] = doneList[date];
    delete doneList[date];
}

function deleteTask(date) {
    // delete task from doneList
    delete doneList[date];
}

function editTask(date) {
    var edit = taskList[date]
    delete taskList[date];
    return edit
}


// Aux function to process body

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var formServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 19)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": {
                    // GET /register --------------------------------------------------------------
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(formTemplates.toDoForm(d, taskList, doneList, null))
                    res.end()
                    break
                }
            case "POST": {
                    // POST /persons ----------------------------------------------------------------
                    collectRequestBodyData(req, result => {
                        console.log(result)
                        if(result){
                            if ("done" in result){
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                markAsDone(result["done"])
                                res.write(formTemplates.toDoForm(d, taskList, doneList, null))
                                res.end()
                            }
                            else if ("edit" in result && result["edit"] != "False"){
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                var edit = editTask(result["edit"])
                                res.write(formTemplates.toDoForm(d, taskList, doneList, edit))
                                res.end()
                            }
                            else if ("notDone" in result){
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                markAsNotDone(result["notDone"])
                                res.write(formTemplates.toDoForm(d, taskList, doneList, null))
                                res.end()
                            }
                            else if ("delete" in result){
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                deleteTask(result["delete"])
                                res.write(formTemplates.toDoForm(d, taskList, doneList, null))
                                res.end()
                            }
                            else if(result["date"] == "" && (result["name"] == "" || result["task"] == "" || result["taskType"] == "")){
                                console.log("Here actually")
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(formTemplates.toDoForm(d, taskList, doneList, null))
                                res.end()
                            }
                            else if(result["date"] == ""){
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                taskList[d] = {"date": d.substring(0,10), "name": result["name"], "task": result["task"], "taskType": result["taskType"]}
                                res.write(formTemplates.toDoForm(d, taskList, doneList, null))
                                res.end()
                            }
                            else {
                                console.dir(result)
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                taskList[d] = {"date": result["date"], "name": result["name"], "task": result["task"], "taskType": result["taskType"]}
                                console.log(taskList)
                                res.write(formTemplates.toDoForm(d, taskList, doneList, null))
                                res.end()
                            }
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                    break
            }
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

formServer.listen(7777, ()=>{
    console.log("Server listening on 7777...")
})
