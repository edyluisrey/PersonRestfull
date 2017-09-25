var express = require('express');
var router = express.Router();

//GET	Get all the persons.
router.get('/persons', function(req, res, next) {
	let db = req.app.locals.db;
	db.collection("test_person").find({}).toArray( function (err,docsArr){
	       	res.json(docsArr);   
	});
});

//POST Create a person
router.post('/person', function(req, res, next) {
       /*var obj = new Job(req.body);

        console.log("jobAdd Server 22"+JSON.stringify(obj));
        obj.save(function (err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });*/
});

//GET Get a single person by id.
router.get('/person/:id', function (req, res) {
        /*Job.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        })*/
});

//PUT Update a bear with new info.
router.put('/person/:id', function (req, res) {
   /* Job.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
        if (err) return console.error(err);
        res.sendStatus(200);
    })*/
});

// DELETE delete by id
router.delete('/person/:id', function (req, res) {
   /* Job.findOneAndRemove({ _id: req.params.id }, function (err) {
        if (err) return console.error(err);
        res.sendStatus(200);
    });*/
});

module.exports = router;