console.log('Hello World...!');

var xx = function (num1, num2, callback) {
    return callback(num1, num2);
}

var yy = function (aa, bb) {
    return aa + bb;
}

var sum = xx("abc", "xyz", yy)

console.log(sum);