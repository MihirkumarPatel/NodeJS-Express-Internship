exports.display = function(x){
    console.log(x);
}

exports.sum =  function(x, y){
    return parseInt(x)+parseInt(y);
}

exports.multiply =  function(x, y){
    return x*y;
}

exports.divide =  function(x, y){
    return x/y;
}

exports.concateString = function(x, y){
    return (x)+' '+(y);
}

exports.isPalindrome = function(s){
    var r = s.split('').reverse().join('');
    if(s === r) return true;
    return false;
}