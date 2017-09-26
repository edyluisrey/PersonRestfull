var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

//Create new phone
router.put('/addphone/:id', function (req, res) {
	let db = req.app.locals.db;
	var phone= { "ph_id": ObjectId(),
		         "ph_areacode": req.body.ph_areacode,
				 "ph_telephone":req.body.ph_telephone,
				 "ph_primary":req.body.ph_primary
                };

	var query= {"_id": ObjectId(req.params.id)};

    var operator = {'$push':{"pr_phones":phone}};
	db.collection("person").update(query, operator, function(err,numUpdated){
		res.sendStatus(200);
	});		         
});

//Update phone
router.put('/updatephone/:id', function (req, res) {
    let db = req.app.locals.db;
    var query = { "_id": ObjectId(req.params.id), 
              "pr_phones.ph_id": ObjectId(req.body.ph_id)};

    var phone= {
		         "pr_phones.$.ph_areacode": req.body.ph_areacode,
				 "pr_phones.$.ph_telephone":req.body.ph_telephone,
				 "pr_phones.$.ph_primary":req.body.ph_primary
                };

    var operator = {'$set':phone};
    db.collection('person').update(query, operator, (err, result) => {
         if (err) return console.log(err)
         res.sendStatus(200);
    }); 
});

//Remove phone
router.put('/removephone/:id', function (req, res) {
	let db = req.app.locals.db;
	var phone= { "ph_id": ObjectId(req.body.ph_id),
		         "ph_areacode": req.body.ph_areacode,
				 "ph_telephone":req.body.ph_telephone,
				 "ph_primary":req.body.ph_primary
                };

	var query= {"_id": ObjectId(req.params.id)};

    var operator = {'$pull':{"pr_phones":phone}};
	db.collection("person").update(query, operator, function(err,numUpdated){
		res.sendStatus(200);
	});		         
});

module.exports = router;