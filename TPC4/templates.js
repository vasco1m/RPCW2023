exports.toDoForm = function(d, taskList, doneList, edit){

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Form demo</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>ToDo List</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Formulário</legend>
                        <label>Data Limite</label>
                        <input class="w3-input w3-round" type="date" name="date" value="${edit != null && "date" in edit ? edit["date"] : ""}" required>
                        <label>Criador</label>
                        <input class="w3-input w3-round" type="text" name="name" value="${edit != null && "name" in edit ? edit["name"] : ""}" required>
                        <label>Tarefa</label>
                        <input class="w3-input w3-round" type="text" name="task" value="${edit != null && "task" in edit ? edit["task"] : ""}" required>
                        <label>Tipo de Tarefa</label>
                        <input class="w3-input w3-round" type="text" name="taskType" value="${edit != null && "taskType" in edit ? edit["taskType"] : ""}" required>
                    </fieldset>

                    <br/>
                    <input type="hidden" name="edit" value="False">
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>
                <div class="w3-container">
                    <h1>ToDo</h1>
                `
    Object.keys(taskList).forEach(function(key) {
        pagHTML = pagHTML + `
                <div class="w3-container">
                    <form method="POST">
                        <ul class="w3-ul w3-card-4" style="width:50%">
                            <li><b>Data de Criação: </b> ${key}</li>
                            <li><b>Data Limite: </b> ${taskList[key]["date"]}</li>
                            <li><b>Criador: </b> ${taskList[key]["name"]}</li>
                            <li><b>Tarefa: </b> ${taskList[key]["task"]}</li>
                            <li><b>Tipo de Tarefa: </b> ${taskList[key]["taskType"]}</li>
                        </ul>
                        <br/>
                        <input type="hidden" name="done" value="${key}">
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Mark as Done</button>
                    </form>
                    <form method="POST">
                        <input type="hidden" name="edit" value="${key}">
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Edit</button>
                    </form>
                </div>
                `
    });
    pagHTML = pagHTML + `
                </div>
                <div class="w3-container">
                <h1>Done</h1>
                `
    Object.keys(doneList).forEach(function(key) {
            pagHTML = pagHTML + `
                    <div class="w3-container">
                    <form method="POST">
                    <ul class="w3-ul w3-card-4" style="width:50%">
                        <li><b>Data de Criação: </b> ${key}</li>
                        <li><b>Data Limite: </b> ${doneList[key]["date"]}</li>
                        <li><b>Criador: </b> ${doneList[key]["name"]}</li>
                        <li><b>Tarefa: </b> ${doneList[key]["task"]}</li>
                        <li><b>Tipo de Tarefa: </b> ${doneList[key]["taskType"]}</li>
                    </ul>
                    <br/>
                    <input type="hidden" name="notDone" value="${key}">
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Mark as Not Done</button>
                </form>
                <form method="POST">
                    <input type="hidden" name="delete" value="${key}">
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Delete</button>
                </form>
                    </div>
                `
    });
    pagHTML = pagHTML + `
                </div>
                <footer class="w3-container w3-purple">
                    <h5>Generated by Vasco Matos in ${d}</h5>
                </footer>
            
            </div>
            `
    return pagHTML
}
