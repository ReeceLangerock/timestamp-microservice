var express = require('express');
console.log("Test");
var app = express();

app.get('/', function (req, res) {
  res.send('Fuck Off World!')

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
