var express = require('express');
const { routes } = require('../app');
var router = express.Router();
var db = require('../lib/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


/**COURSES */
router.get('/courses', function(req, res, next) {
  var query = "SELECT * FROM Course"
    db.query(query, function(error, rows){
        if(error)
        {
          res.render('courses', { title: 'Courses' });
          console.log("SQL ERROR");
        }
        else
        {
          res.render('courses',{title:"Courses",courses: rows , 
        url: req.protocol + '://' + req.get('host')+ req.baseUrl});
        }
    });
});

router.get('/courses/deleteall',function(req,res,next){
  var query = "DELETE FROM Course";
  db.execute(query,function(error,result,fields){
    if(error)
    {
      console.log("Database couldn't delete data.");
      res.redirect('/courses');
    }
    else
    {
      res.redirect('/courses');
    }
  });
});

router.post('/courses/add',function(req,res,next){
  var query = "INSERT INTO Course (title,stream,type,start_date,end_date) "
  +"VALUES("
  +"'"+req.body.title+"', "
  +"'"+req.body.stream+"', "
  +"'"+req.body.type+"', "
  +"'"+req.body.startDate +"', "
  +"'"+req.body.endDate +"' "
  +")";
  console.log(query)
  db.query(query,function(error,status){
    if(error)
    {
      console.log(error);
      res.redirect('/courses');
    }
    else
    {
      res.redirect('/courses');
    }
  });

});
/**ABOUT */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
/**ASSIGNMESTS */
router.get('/assignments', function(req, res, next) {
  var query = "SELECT * FROM Assignment"
  db.query(query, function(error, rows){
      if(error)
      {
        res.render('assignments', { title: 'Assignments' });
        console.log("SQL ERROR");
      }
      else
      {
        res.render('assignments',{title:"Assignments",assignments: rows , 
      url: req.protocol + '://' + req.get('host')+ req.baseUrl});
      }
  });
});

router.get('/assignments/deleteall',function(req,res,next){
  var query = "DELETE FROM Assignment";
  db.execute(query,function(error,result,fields){
    if(error)
    {
      console.log("Database couldn't delete data.");
      res.redirect('/assignments');
    }
    else
    {
      res.redirect('/assignments');
    }
  });
});

router.post('/assignments/add',function(req,res,next){
  var query = "INSERT INTO Assignment (title,description,subDateTime,oralMark,totalMark) "
  +"VALUES("
  +"'"+req.body.title+"', "
  +"'"+req.body.description+"', "
  +"'"+req.body.subDateTime+"', "
  +"'"+req.body.oralMark+"', "
  +"'"+req.body.totalMark+"' "
  +")";

  db.query(query,function(error,status){
    if(error)
    {
      console.log(error);
      res.redirect('/assignments');
    }
    else
    {
      res.redirect('/assignments');
    }
  });

});

/**TRAINERS */
router.get('/trainers', function(req, res, next) {
  var query = "SELECT * FROM Trainer"
  db.query(query, function(error, rows){
      if(error)
      {
        res.render('trainers', { title: 'Trainers' });
        console.log("SQL ERROR");
      }
      else
      {
        res.render('trainers',{title:"Trainers",trainers: rows , 
      url: req.protocol + '://' + req.get('host')+ req.baseUrl});
      }
  });
});

router.get('/trainers/deleteall',function(req,res,next){
  var query = "DELETE FROM Trainer";
  db.execute(query,function(error,result,fields){
    if(error)
    {
      console.log("Database couldn't delete data.");
      res.redirect('/trainers');
    }
    else
    {
      res.redirect('/trainers');
    }
  });
});

router.post('/trainers/add',function(req,res,next){
  var query = "INSERT INTO Trainer (firstName,lastName,subject) "
  +"VALUES("
  +"'"+req.body.fname+"', "
  +"'"+req.body.lname+"', "
  +"'"+req.body.subject+"' "
  +")";
  db.query(query,function(error,status){
    if(error)
    {
      console.log(error);
      res.redirect('/trainers');
    }
    else
    {
      res.redirect('/trainers');
    }
  });

});

/**STUDENTS */
router.get('/students', function(req, res, next) {
  var query = "SELECT * FROM Student"
  db.query(query, function(error, rows){
      if(error)
      {
        res.render('students', { title: 'Students' });
        console.log("SQL ERROR");
      }
      else
      {
        res.render('students',{title:"Students",students: rows , 
      url: req.protocol + '://' + req.get('host')+ req.baseUrl});
      }
  });
});

router.get('/students/deleteall',function(req,res,next){
  var query = "DELETE FROM Student";
  db.execute(query,function(error,result,fields){
    if(error)
    {
      console.log("Database couldn't delete data.");
      res.redirect('/students');
    }
    else
    {
      res.redirect('/students');
    }
  });
});

router.post('/students/add',function(req,res,next){
  var query = "INSERT INTO Student (firstName,lastName,dateOfBirth,tuitionFees) "
  +"VALUES("
  +"'"+req.body.fname+"', "
  +"'"+req.body.lname+"', "
  +"'"+req.body.dateOfBirth+"', "
  +"'"+req.body.tuitionFees+"' "
  +")";
  db.query(query,function(error,status){
    if(error)
    {
      console.log(error);
      res.redirect('/students');
    }
    else
    {
      res.redirect('/students');
    }
  });

});



module.exports = router;


