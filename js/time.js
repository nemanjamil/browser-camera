
function calcTime(city, offset) {
     d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000*offset));
    return nd;
    //return nd.toLocaleString();
}

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
   }


let localTime = Math.floor(new Date() / 1000)

Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
Date.time = function() { return new Date().toUnixTime(); }

    // Get the current unix time: 
console.log("Current Time: " + Date.time())
console.log("Date.now() : "+Date.now());
console.log("localTime : "+localTime);
let lnd = calcTime('London', '+1');
console.log("CALCTIME "+ lnd);
console.log("CALCTIME "+ lnd.toLocaleString());
console.log("CALCTIME toTimestamp :  " +toTimestamp(lnd));
console.log("getTimezoneOffset() : "+ new Date().getTimezoneOffset());
console.log("getTime() : "+ new Date().getTime());