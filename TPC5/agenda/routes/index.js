var express = require('express');
var router = express.Router();
var tasks = {}
var tasksDone = {}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tasks: tasks, tasksDone: tasksDone });
});

router.post('/add', function(req, res){
  var data = new Date().toISOString().substring(0, 16)
  var limitDate = req.body.limitDate == '' ? data.substring(0, 10) : req.body.limitDate
  if (req.body.id) {
    tasks[req.body.id] = {'createdDate': data, 'limitDate': limitDate, 'creator': req.body.creator, 'task': req.body.task, 'taskType': req.body.taskType}
  }
  else
    tasks[data] = {'createdDate': data, 'limitDate': limitDate, 'creator': req.body.creator, 'task': req.body.task, 'taskType': req.body.taskType}
  res.render('index', {tasks: tasks, tasksDone: tasksDone})
})

router.post('/done', function(req, res){
  tasksDone[req.body.id] = tasks[req.body.id]
  delete tasks[req.body.id]
  res.render('index', {tasks: tasks, tasksDone: tasksDone})
})

router.post('/ndone', function(req, res){
  tasks[req.body.id] = tasksDone[req.body.id]
  delete tasksDone[req.body.id]
  res.render('index', {tasks: tasks, tasksDone: tasksDone})
})

router.post('/edit', function(req, res){
  var t = tasks[req.body.id]
  delete tasks[req.body.id]
  res.render('index', {tasks: tasks, tasksDone: tasksDone, edit: t})
})

router.post('/delete', function(req, res){
  delete tasksDone[req.body.id]
  res.render('index', {tasks: tasks, tasksDone: tasksDone})
})

module.exports = router;
