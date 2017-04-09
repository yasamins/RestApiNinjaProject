const express = require ('express');
const router = express.Router();
const Ninja = require('../models/ninja');
/**
* @api {get}  /ninjas/:id
* @apiGroup ninjas
* @apiParam {id} id ninja id
* @apiName GetNinja
* @apiDescription to get a ninja by its identifier which is the id here
*@apiErrorExample {json} Task not found
*    HTTP/1.1 404 Not Found
* @apiErrorExample {json} Find error
*    HTTP/1.1 500 Internal Server Error
*/

// get a list of ninjas from the db
router.get('/ninjas/:id', function(req, res, next){
  Ninja.find({_id:req.params.id}).then(function(ninja) {
    res.send(ninja);
  });
    });

/**
* @api {get} /ninjas
* @apiGroup ninjas
* @apiName Findninjas
* @apiDescription find a list of ninjas


*@apiErrorExample {json} Task not found
*    HTTP/1.1 404 Not Found
* @apiErrorExample {json} Find error
*    HTTP/1.1 500 Internal Server Error
*/
router.get('/ninjas', function(req, res, next){
  Ninja.find({}).then(function(ninjas) {
    res.json(ninjas);

});
    // res.send({type: 'GET'});
});

/**
* @api {post} /add a new ninja
* @apiGroup ninjas
* @apiName Createninja
* @apiDescription add a new ninja to the database
*@apiErrorExample {json} Task not found
*    HTTP/1.1 404 Not Found
* @apiErrorExample {json} Find error
*    HTTP/1.1 500 Internal Server Error
*/

// add a new ninja to the db
router.post('/ninjas', function(req,res,next){
  // console.log('You made a POST request: ', req.body);
//making a new ninja object and save it to db using mongoose create method
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
        //error handling
    }).catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
//  so we gonna find that specific ninja by the id and update its body
  Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Ninja.findOne({_id:req.params.id}).then(function(ninja) {
      res.send(ninja);
    });

  });
    // res.send({type: 'PUT'});
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
  // console.log(req.params.id);
  //this is a mongoose method
  Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  });
    // res.send({type: 'DELETE'});
});

module.exports = router;
