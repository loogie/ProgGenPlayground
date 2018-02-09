import React from 'react';
import * as Helper from "../apis/helper";
import * as Traits from "../apis/story/traits";

const test = {
    "test": {
        "option1": {
            "opt1-option1": ["opt1-opt1-1", "opt1-opt1-2", "opt1-opt1-3"],
            "opt1-option2": ["opt1-opt2-1", "opt1-opt2-2", "opt1-opt2-3"],
            "opt1-option3": ["opt1-opt3-1", "opt1-opt3-2", "opt1-opt3-3"]
        },
        "option2": {
            "opt2-option1": ["opt2-opt1-1", "opt2-opt1-2"],
            "opt2-option2": ["opt2-opt2-1", "opt2-opt2-2"]
        },
        "option3": ["opt3-1", "opt3-2", "opt3-3", "opt3-4"]
    }
}

export default class Test extends React.Component {

    test(){
        console.log("GET ARRAY NO DUPS");
        console.log(Traits.getArrayNoDups([1, 2, 3, 4], [2, 4]));
        console.log("GET TRAIT ARRAY");
        console.log("opt1-option2");
        console.log(Traits.getTraitArray(test, ["test", "option1", "opt1-option2"]));
        console.log("option2");
        console.log(Traits.getTraitArray(test, ["test", "option2"]));
        console.log("test");
        console.log(Traits.getTraitArray(test, ["test"]));
        console.log("GET TRAIT");
        console.log(Traits.getTrait(test, ["test", "option2"]));
        console.log(Traits.getTrait(test, ["test", "option2"]));
        console.log(Traits.getTrait(test, ["test", "option2"]));
        console.log(Traits.getTrait(test, ["test"]));
    }

    render(){
        return (
            <div className="test">
                <a href="#" onClick={(e)=>this.test()}>Test1</a>
            </div>
        );
    }
}