var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var url = require('url');
var dateFormat = require('dateformat');

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded());


app.get('/', function(req, res) {
    res.render('index');
});



app.get('/:date', function(req, res) {

    var tempDate = decodeURI(req.params.date);
    if (!isNaN(req.params.date)) {
        var formattedUserEntry = unixToDate(req.params.date);
        res.send(formattedUserEntry);
    } else if (checkDate(tempDate)) { //if date is valid
        tempDate = tempDate.split(',');
        var formattedDate = new Date(tempDate);
        try {
            formattedDate = dateFormat(formattedDate, "dddd, mmmm dS, yyyy");
            res.send({
                "unix": getUnixTime(tempDate),
                "natural": formattedDate
            });
        } catch (err) {
            console.log(err);
            res.send({
                "unix": null,
                "natural": null
            });
        }

    } else {
        res.send({
            "unix": null,
            "natural": null
        });

    }

})

function checkDate(date) {
    var regex = /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{1,2}\s+\d{4}/i;
    return regex.test(date);

}

function unixToDate(userURL) {
    var t = new Date(userURL * 1000);
    t = dateFormat(t, "dddd, mmmm dS, yyyy");
    //var formattedTime = t.getDate()+ t.getDay();
    return {
        "unix": userURL,
        "natural": t
    };
};

function getUnixTime(date) {
    return new Date(date).getTime() / 1000;

};


app.listen(port, function() {
    console.log('Example app listening on port 3000!')
});
