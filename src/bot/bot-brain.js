var BrainJSClassifier = require('natural-brain');
var classifier = new BrainJSClassifier();
var http = require('http');
var url = require('url');

classifier.addDocument('my unit-tests failed.', {});
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('tomorrow we will do standup.', 'meeting');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('can you play some new music?', 'music');

classifier.train();

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    var q = url.parse(req.url, true).query;
    if (q.chat) {
        res.end(classifier.classify(q.chat));
    } else {
        res.end({});
    }
}).listen(8000);