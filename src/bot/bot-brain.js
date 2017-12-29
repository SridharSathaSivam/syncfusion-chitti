var BrainJSClassifier = require('natural-brain');
var classifier = new BrainJSClassifier();
var http = require('http');
var url = require('url');
var db = require('./bot-db.json')

// classifier.addDocument('my unit-tests failed.', '"https://github.com/SridharSathaSivam/syncfusion-chitti"');
// classifier.addDocument('tried the program, but it was buggy.', '"https://github.com/SridharSathaSivam/syncfusion-chitti"');
// classifier.addDocument('tomorrow we will do standup.', '"https://github.com/SridharSathaSivam/syncfusion-chitti"');
// classifier.addDocument('the drive has a 2TB capacity.', '"https://github.com/SridharSathaSivam/syncfusion-chitti"');
// classifier.addDocument('i need a new power supply.', '"https://github.com/SridharSathaSivam/syncfusion-chitti"');
// classifier.addDocument('can you play some new music?', '"https://github.com/SridharSathaSivam/syncfusion-chitti"');

var qus = Object.keys(db);

for (var i = 0; i < qus.length; i++) {
    var curQus = qus[i];
    classifier.addDocument(curQus, db[curQus]);
}

classifier.train();

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });
    var q = url.parse(req.url, true).query;
    if (q.chat) {
        res.end(classifier.classify(q.chat));
    }
}).listen(8000);