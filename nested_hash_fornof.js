

//Author : Robert Fornof
// This takes pipe strings and as long as the last one is a value, adds it as such to a 
//hashmap
// sample call : 
// pipe_array_to_hashmap(['app1|server1|uptime|5',
// 'app1|server1|loadavg|0.01 0.02 0.03',
// 'app1|server1|conn1|state|up',
// 'app1|server2|uptime|10',
// 'app1|server2|loadavg|0.11 0.22 0.33',
// 'app1|server2|conn1|state|down',
// 'app1|running|true'])
function pipe_array_to_hashmap(pipe_strings) {
  var hashmap = {};
  for (i in pipe_strings) {
    var string_array = pipe_strings[i].split("|");
    var pre_hash = {};
    var value = "";
    var current = hashmap;
    //console.log(string_array)
    for (j in string_array) {
      
      // if last one, its a value, add it in
      if ((j == (string_array.length - 2))) {
        //console.log("adding "+string_array[string_array.length-1]);
       
        current[string_array[j]] = string_array[string_array.length-1];
        
        break;
      } 
      else {
        // fill if empty
        if (current[string_array[j]] == undefined) {
          current[string_array[j]] = {};
        }
        current = current[string_array[j]]
      }
     
    }
  }
  return hashmap
}

console.log("sample call:")
console.log(`pipe_array_to_hashmap(['app1|server1|uptime|5',
 'app1|server1|loadavg|0.01 0.02 0.03',
 'app1|server1|conn1|state|up',
 'app1|server2|uptime|10',
 'app1|server2|loadavg|0.11 0.22 0.33',
 'app1|server2|conn1|state|down',
 'app1|running|true'])`)
 console.log("")
 var hashmap = pipe_array_to_hashmap(['app1|server1|uptime|5',
 'app1|server1|loadavg|0.01 0.02 0.03',
 'app1|server1|conn1|state|up',
 'app1|server2|uptime|10',
 'app1|server2|loadavg|0.11 0.22 0.33',
 'app1|server2|conn1|state|down',
 'app1|running|true'])
console.log(JSON.stringify(hashmap, null, 4))
