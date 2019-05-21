// author: Robert Fornof
// this converts a subnet mask to a CIDR code.
// The easiest way to do this is using a lookup table,
// The more intricate way is to convert each octet to bits
// and count the ones, if there is a 1 after a 0 , then it is not a valid subnet mask
// I used a lookup and gave the option for a calculation.
// sample calls:
// node netmask_CIDR_fornof.js - this will provide a console input
// netmask_to_bits("255.255.252.0", false)//use actual calculation
// netmask_to_bits("255.255.252.0", true) // use lookup table
function padOctet(octet){
  var needed_length = (255).toString(2).length
  var actual_length = octet.length
  var result = []
  for(var i = 0 ; i < needed_length - actual_length; i++){
    result.push("0");
  }
  return result.join("") + octet
}
function netmask_to_bits(subnet, use_lookup_table) {
  var result = -1;
  if (use_lookup_table) {
    var subnet_conversion = {
      "255.255.255.255": 32,
      "255.255.255.254": 31,
      "255.255.255.252": 30,
      "255.255.255.248": 29,
      "255.255.255.240": 28,
      "255.255.255.224": 27,
      "255.255.255.192": 26,
      "255.255.255.128": 25,
      "255.255.255.0": 24,
      "255.255.254.0": 23,
      "255.255.252.0": 22,
      "255.255.248.0": 21,
      "255.255.240.0": 20,
      "255.255.224.0": 19,
      "255.255.192.0": 18,
      "255.255.128.0": 17,
      "255.255.0.0": 16,
      "255.254.0.0": 15,
      "255.252.0.0": 14,
      "255.248.0.0": 13,
      "255.240.0.0": 12,
      "255.224.0.0": 11,
      "255.192.0.0": 10,
      "255.128.0.0": 9,
      "255.0.0.0": 8,
      "254.0.0.0": 7,
      "252.0.0.0": 6,
      "248.0.0.0": 5,
      "240.0.0.0": 4,
      "224.0.0.0": 3,
      "192.0.0.0": 2,
      "128.0.0.0": 1,
      "0.0.0.0": 0
    };
    result = subnet_conversion[subnet];
    if (result == undefined) {
      result = -1;
    }
    return result;
  } else {
    // actual subnet
    var octets = subnet.split(".");
    var bits = "";
    for (i in octets) {
      bits += padOctet(parseInt(octets[i]).toString(2));
      //console.log(bits.toString(2));
    }
    var no_ones = false;
    var ones_count = 0;
    if(bits.length < ((255).toString(2).length*4)){
      return -1
    }
    for (i in bits) {
      if (bits[i] === "1") {
        if (no_ones) {
          return -1;
        }
        ones_count++;
      }
      if (bits[i] === "0") {
        no_ones = true;
      }
    }
    return ones_count;
  }
}


async function question(){
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
   readline.question(`please enter subnet mask (eg: 255.255.255.0) for a CIDR: `, (subnet) => {
    if(subnet =="exit"){
      console.log("exiting")
      readline.close()
      return;
    }
    
    console.log(`Subnet using calculation: `)
    console.log(netmask_to_bits(subnet, false) )
    console.log(`Subnet using lookup table: `)
    console.log(netmask_to_bits(subnet, true) )
    readline.close()
    question();
    
  });
}
async function main(){
 question();
}
main();