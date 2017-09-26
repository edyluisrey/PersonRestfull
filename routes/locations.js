var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

//Create new Location
router.put('/addlocation/:id', function (req, res) {
	let db = req.app.locals.db;
	var location= { "lc_id": ObjectId(),
		            "lc_address": req.body.lc_address,
                    "lc_city": req.body.lc_city,
                    "lc_zipcode": req.body.lc_zipcode,
                    "lc_country": req.body.lc_country,
                    "lc_primary": req.body.lc_primary
                   };
    console.log(location); 
	var query= {"_id": ObjectId(req.params.id)};

    var operator = {'$push':{"pr_locations":location}};
	db.collection("person").update(query, operator, function(err,numUpdated){
		res.sendStatus(200);
	});		         
});

//Update location
router.put('/updatelocation/:id', function (req, res) {
    let db = req.app.locals.db;
    var query = { "_id": ObjectId(req.params.id), 
              "pr_locations.lc_id": ObjectId(req.body.lc_id)};

    var location= {  
    	            "pr_locations.$.lc_address": req.body.lc_address,
                    "pr_locations.$.lc_city": req.body.lc_city,
                    "pr_locations.$.lc_zipcode": req.body.lc_zipcode,
                    "pr_locations.$.lc_country": req.body.lc_country,
                    "pr_locations.$.lc_primary": req.body.lc_primary
                   };

    var operator = {'$set':location};
    db.collection('person').update(query, operator, (err, result) => {
         if (err) return console.log(err)
         res.sendStatus(200);
    }); 
});

router.put('/removelocation/:id', function (req, res) {
	let db = req.app.locals.db;
	var location= { "lc_id": ObjectId(req.body.lc_id),
		            "lc_address": req.body.lc_address,
                    "lc_city": req.body.lc_city,
                    "lc_zipcode": req.body.lc_zipcode,
                    "lc_country": req.body.lc_country,
                    "lc_primary": req.body.lc_primary
                   };

	var query= {"_id": ObjectId(req.params.id)};

    var operator = {'$pull':{"pr_locations":location}};
	db.collection("person").update(query, operator, function(err,numUpdated){
		res.sendStatus(200);
	});		         
});

module.exports = router;