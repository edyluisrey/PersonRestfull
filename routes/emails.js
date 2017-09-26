var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

//Create new email
router.put('/addemail/:id', function (req, res) {
	let db = req.app.locals.db;
	var email= { "em_id": ObjectId(),
		         "em_email": req.body.em_email,
                 "em_primary": req.body.em_primary
                };

	var query= {"_id": ObjectId(req.params.id)};

    var operator = {'$push':{"t_emails":email}};
	db.collection("person").update(query, operator, function(err,numUpdated){
		res.sendStatus(200);
	});		         
});

//Update email
router.put('/updateemail/:id', function (req, res) {
    let db = req.app.locals.db;
    var query = { "_id": ObjectId(req.params.id), 
              "t_emails.em_id": ObjectId(req.body.em_id)};
    
    var email= { 
		         "t_emails.$.em_email": req.body.em_email,
                 "t_emails.$.em_primary": req.body.em_primary
                };

    var operator = {'$set':email};
    db.collection('person').update(query, operator, (err, result) => {
         if (err) return console.log(err)
         res.sendStatus(200);
    }); 
});
//Remove email
router.put('/removeemail/:id', function (req, res) {
	let db = req.app.locals.db;
	var email= { "em_id": ObjectId(req.body.em_id),
		         "em_email": req.body.em_email,
                 "em_primary": req.body.em_primary
                };

	var query= {"_id": ObjectId(req.params.id)};

    var operator = {'$pull':{"t_emails":email}};
	db.collection("person").update(query, operator, function(err,numUpdated){
		res.sendStatus(200);
	});		         
});

module.exports = router;