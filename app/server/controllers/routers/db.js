const express = require('express');
const router = express.Router();
const Models = require('../../models');
const Promise = require('bluebird');

router.post('/:action/:modelName', (req, res)=>{
    
    let action = req.params.action;
    let modelName = req.params.modelName;
    let body = req.body;
    
    let response = {};

    switch (action){
        case "create":
            createItem(res, modelName, body.options);
            break;
        case "update":
            updateItem(res, modelName, body.id, body.options);
            break;
        case "delete":
            deleteItem(res, modelName, body.id);
            break;
        case "getall":
            Models[modelName].run().then((results)=>{
                res.send({
                    results,
                    message:"Got all " + modelName + "s"
                })
            })
            break;
    }

});

function createItem(res, modelName, options){
    let newItem = new Models[modelName](options);
    newItem.saveAll().then((result)=>{
        let response = {};
        response.result = result;
        response.message = "Created new " + modelName;

        res.send(response);
    });
}

function updateItem(res, modelName, id, options){
    getItemWithID(modelName, id).then((result)=>{
        for(let prop in options){
            if (options.hasOwnProperty(prop)){
                if (result.hasOwnProperty(prop)){
                    result[prop] = options[prop];
                }
            }
        }

        result.saveAll().then((result)=>{
            res.send({result, message:"Item has been update."});
        })
    });
}

function deleteItem(res, modelName, id){
    getItemWithID(modelName, id).then((result)=>{
        result.delete().then((result)=>{
            res.send({message:"Item has been deleted."});
        })
    });
}

function getItemWithID(modelName, id){
    return new Promise((resolve, reject)=>{
        Models[modelName].filter({id}).run().then((results)=>{
            if (results){
                resolve(results[0]);
            }
            else {
                reject({error:"No item with ID found"});
            }
        })
    });
}

module.exports = router;
