var BrainJSClassifier = require('natural-brain');
var classifier = new BrainJSClassifier();
var http = require('http');
var url = require('url');
var db = require('./bot-db.json')

var qus = Object.keys(db);

for (var i = 0; i < qus.length; i++) {
    var curQus = qus[i];
    classifier.addDocument(curQus, JSON.stringify(db[curQus]));
}

classifier.train();

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });
    var q = url.parse(req.url, true).query;
    if (q.chat) {
        var output = classifier.classify(q.chat);
        res.end(output);
    }
}).listen(8000);

console.log('AI Bot is Running...');