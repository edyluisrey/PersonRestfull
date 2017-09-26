var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

//GET	Get all the persons.
router.get('/persons', function(req, res, next) {
	let db = req.app.locals.db;
	db.collection("person").find({}).toArray( function (err,docsArr){
	       	res.json(docsArr);   
	});
});

//GET Get all doctors.
router.get('/persons/doctors', function(req, res, next) {
	let db = req.app.locals.db;
	db.collection("person").find({ "pr_types": "Doctor" }).toArray( function (err,docsArr){
	       	res.json(docsArr);   
	});
});

//GET Get all owners.
router.get('/persons/owners', function(req, res, next) {
	let db = req.app.locals.db;
	db.collection("person").find({ "pr_types": "Owner" }).toArray( function (err,docsArr){
	       	res.json(docsArr);   
	});
});

//POST Create a person
router.post('/person', function(req, res, next) {
       let db = req.app.locals.db; 
	   //res.json(req.body); 
       db.collection("person").insert(req.body,function(err,docInserted){
          if(err) throw error;
            res.status(200).json(docInserted);                    
       });
});

//GET Get a single person by id.
router.get('/person/:id', function (req, res) {
	  let db = req.app.locals.db;
	  var query= {"_id": ObjectId(req.params.id)};	  
	  db.collection('person').findOne(query, function(err, doc){
         if(err) throw err;
         res.json(doc); 
	  }); 
});

//PUT Update a bear with new info.
router.put('/person/:id', function (req, res) {
	let db = req.app.locals.db;
	var query= {"_id": ObjectId(req.params.id)};
    var operator = {'$set':{   "pr_title":req.body.pr_title,
	                           "pr_lastname": req.body.pr_lastname,
						       "pr_firstname": req.body.pr_firstname,
						       "pr_gender": req.body.pr_gender,
						       "pr_status": req.body.pr_status,
						       "pr_types": req.body.pr_types
			                }
			         };
	db.collection("person").update(query, operator, function(err,numUpdated){
		res.sendStatus(200); 
	});		         
});

// DELETE delete by id
router.delete('/person/:id', function (req, res) {
   let db = req.app.locals.db;
   var query= {"_id": ObjectId(req.params.id)};
   db.collection("person").remove(query, function(err,removed){
          if(err) throw err;
          console.log("remove:"+removed);
          res.sendStatus(200);
    });
});

module.exports = router;