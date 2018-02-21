import * as Helper from '../helper';

export const Lib = {
    descriptors: [],
    feelings: [],
    things: []
}

export function Init(){
    fetch("/api/getStory", {method: "POST"})
      .then(function(response) {
        if (response.status >= 400){
          console.log("Error");
          console.log(response);
          reject(new Error(response.status + ": " + response.statusText));
        }
        return response.json();
      })
      .then(function(json){
        if (json.message){
          reject(new Error(json.message));
        }
        else {
            Lib.descriptors = addTo(Lib.descriptors, json.descriptors);
            Lib.feelings = addTo(Lib.feelings, json.feelings);
            Lib.things = addTo(Lib.things, json.things);

            console.log(Lib);
        }
      });
}

function addTo(list, newList){
    return [...list, ...newList];
}

export function GetRandomFeeling(tags, existing){
    let matches = Lib.feelings;
    tags.forEach((searchtag)=>{
        let newMatches = [];
        matches.forEach((feeling)=>{
            if (Helper.findIndexOfItemInArray(feeling.tags, searchtag) != -1){
                //tag found, keep in match list
                newMatches.push(feeling);
            }
        });
        matches = newMatches;
    });
}

export function GetRandomDesc(tags, existing){
    let matches = Lib.descriptors;

    //search all desc for matching tags
    tags.forEach((searchtag)=>{
        let newMatches = [];
        matches.forEach((desc)=>{
            if (Helper.findIndexOfItemInArray(desc.tags, searchtag) != -1){
                //tag found, keep in match list
                newMatches.push(desc);
            }
        });
        matches = newMatches;
    });


    //if exisiting is available, check for duplicates or opposing desc's
    if (existing){
        let newMatches = matches;
        matches.forEach((desc)=>{
            existing.forEach((edesc)=>{
                if (edesc.name == desc.name){
                    //duplicate of existing desc, delete
                    newMatches.splice(Helper.findIndexOfItemInArray(newMatches, desc.name, "name"), 1);
                }

                if (edesc.opposing){
                    edesc.opposing.forEach((otag)=>{
                        if (Helper.findIndexOfItemInArray(desc.tags, otag) != -1){
                            //opposing an existing desc, delete
                            newMatches.splice(Helper.findIndexOfItemInArray(newMatches, desc.name, "name"), 1);
                        }
                    });
                }

                if (desc.opposing){
                    desc.opposing.forEach((otag)=>{
                        if (Helper.findIndexOfItemInArray(edesc.tags, otag) != -1){
                            //opposing an existing desc, delete
                            newMatches.splice(Helper.findIndexOfItemInArray(newMatches, desc.name, "name"), 1);
                        }
                    });
                }
            })
        });

        matches = newMatches;
    }

    if (matches.length > 0){
        //out of remaining matches, return a random one
        return matches[Helper.getRandom(0, matches.length)];
    }
    else {
        //no matches left, return nothings
        return null;
    }
}