const Helper = require('../../../global/helper');
const fs = require("fs");
const glob = require('glob');

let exp = {
    masterLib: {
        descriptors:[],
        feelings:[]
    }
}

let files = glob.sync(__dirname + '/*.json');
files.forEach((file)=>{
    let libfile = require(file);
    loadLibFile(libfile);
});

exp.loadLibFile = loadLibFile;

function loadLibFile(file){
    let dduplicates = [];
    let dcount = 0;
    console.log(file);
    file.descriptors.forEach((desc)=>{
        if (Helper.findIndexOfItemInArray(exp.masterLib.descriptors, desc["name"], "name") != -1){
            console.log("duplicate found with name " + desc.name);
            dduplicates.push(desc);
        }
        else {
            exp.masterLib.descriptors.push(desc);
            dcount++;
        }
    });

    let fduplicates = [];
    let fcount = 0;
    file.feelings.forEach((feeling)=>{
        if (Helper.findIndexOfItemInArray(exp.masterLib.feelings, feeling["name"], "name") != -1){
            console.log("duplicate found with name " + feeling.name);
            fduplicates.push(feeling);
        }
        else {
            exp.masterLib.feelings.push(feeling);
            fcount++;
        }
    });

    console.log("LOADING FINISHED");
    console.log(dcount + " new descriptors loaded");
    console.log(dduplicates.length + " duplicate descriptor names were found and not added");
    console.log(fcount + " new feelings loaded");
    console.log(fduplicates.length + " duplicate feelings names were found and not added");

}

module.exports = exp;