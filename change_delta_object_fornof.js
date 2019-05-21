//Author : Robert Fornof
// This changes the delta of a key value store
// It also prints out obj.key.setValue() as a function

class Youngling {

      constructor(key, value, current_parent) {
        this.key = key;
        this.value = value;
        this.current_parent = current_parent;
      }
      setValue(changer) {
        this.value = changer;
        this.current_parent.modify((this.key + " => " + changer).toString());
      }
    }
class Delta {
//   delta;
 
//   functions;
//   children;
  constructor(dictionary) {
    //  if( dictionary.toString() instanceof {}){
    //     console.log("ERROR, wrong format, use format key => 'value', key2 => 'value2' instead")
    //     return ;
    //  }

    this.functions = {};
    this.mylog = {};
    //this.log = []
    this.delta = this.toDict(dictionary.toString(), true);
  }
  
  log(message) {
    //this.mylog.(message);
  }
  deltas() {
    for (var key in this.mylog) {
        var line = ""
      for(var keyword in this.mylog[key]){
          if (keyword == "DELETE"){
              line = "DELETE " + key ;
              break;
          }
          else if( keyword == "MODIFY"){
              line += "MODIFY "+key +" = "+this.mylog[key]['value'];
          }
          else if (keyword =="ADD"){
              line = "ADD" + key +"\n" + line;
          }
      }
      if(line != ""){
        console.log(line);
      }
      
    }
  }
  toDict(keystring, multi = false) {
    if (!multi) {
      var result = keystring.split("=>");
      var key = result[0].trim();
      var value = result[1].trim();
      //console.log("key:" + key, " value:" + value);
      return { key: key, value: value };
    } else {
      var many_keys = keystring.split(",");
      var keys = {};
      //console.log(many_keys);
      for (var i = 0; i < many_keys.length; i++) {
        var keystring = many_keys[i];
        var result = keystring.split("=>");
        var key = result[0].trim();
        var value = result[1].trim();
        this.mylog[key] = {"key": key,"value":value};
        this.mylog[key]["INIT"]="true";
        keys[key] = value;
        //this[key] = (variable) => { console.log(this.caller + ":" + variable);}
        //this[key] = (variable) => { "this would work if I could figure out how to reflect or create a class for each call" + ":" + variable);}
        this[key] = new Youngling(key, value, this);
        //VM480:42 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
        //at Delta.<computed> [as Hi] (<anonymous>:42:59)
        // at <anonymous>:1:3
      }
      return keys;
    }
  }
  add(keyval) {
    var result = this.toDict(keyval.toString(), false);
    if (this.delta[result["key"]] == undefined) {
      this.delta[result["key"]] = result["value"];
      this.mylog[result["key"]] ={"key":result["key"],"value":result["value"]}
      this.mylog[result["key"]]["ADD"]="true";
      this.log("ADD " + result["key"] + " = " + result["value"]);
    } else {
      this.log("ADD " + result["key"] + " FAILED - ALREADY EXISTS");
    }
  }
  delete(key) {
    try {
      delete this.delta[key];
      this.mylog[key]["DELETE"] = 'true';
    } catch (Exception) {
      this.log("DELETE " + key + " FAILED");
    }
    this.log("DELETE " + key);
  }
  modify(keyval) {
    var result = this.toDict(keyval.toString(), false);
    //console.log("Results" + result.key + ":" + result.value);
    if (this.delta[result.key] != undefined) {
      this.delta[result.key] = result.value;
      this.mylog[result["key"]] ={"key":result["key"],"value":result["value"]}
      this.mylog[result["key"]]["MODIFY"] = 'true';
      this.log("MODIFY " + result.key);
    } else {
      this.log("MODIFY " + result.key + " FAILED - DOES NOT EXIST");
    }
  }
  get(key) {
    if (this.delta[key] != undefined) {
      this.log("GET " + key);
      return this.delta[key];
    } else {
      this.log("GET " + key + "FAILED - DOES NOT EXIST");
      return "";
    }
  }
}
module.exports= Delta;
var delta = null;

var obj = new Delta("deer => 'park',\
foo => 'bar',\
this => 'that'");
//console.log(obj.delta);
console.log("obj.delete('this')");
obj.delete('this');
console.log(`obj.add("gnu => 'linux'");`);
obj.add("gnu => 'linux'");
console.log(`obj.modify(gnu => 'not unix')`);
obj.modify(gnu => 'not unix');
console.log("obj.get('gnu')");
console.log(obj.get('gnu'))

console.log(`obj.modify("deer => 'venison'")`);
obj.modify("deer => 'venison'");
console.log(`obj.modify("gnu => 'emacs'");`);
obj.modify("gnu => 'emacs'");
console.log(`obj.deltas();`)
obj.deltas();

// bonus obj.key - it's close to the bonus thing. 
// console.log(`obj.deer.setValue("MEAT")`)
// obj.deer.setValue("MEAT");
// console.log(`obj.deltas();`)
// console.log(obj.deltas());
