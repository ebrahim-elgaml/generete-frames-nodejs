var config = require("./config.js"),
    express = require('express'),
    winston = require('winston'),
    argv = require('optimist').argv,
    decode = require('./my-worker');


config.server.port = argv.p || argv.port || config.server.port;

var app = express();

var logger = new (winston.Logger)();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

config.logger.forEach(function (transport) {
    if (transport.enabled) {
        transport.object = winston.transports[transport.name];
        logger.add(transport.object, transport.options, transport.created || false);
    }
});

app.head(config.movies_route, function (req, res) {
    var mp4_filename = config.paths.source + '/' + req.params.filename;
    mp4_filename = mp4_filename.replace(/\.webm$/g, '.mp4');

    fs.exists(mp4_filename, function (exists) {
        if (exists) {
            logger.debug("%s: Head request OK.", req.params.filename);
            res.send(200);
        } else {
            logger.error("%s: Head request resulted in NOT FOUND.", req.params.filename);
            res.send(404);
        }
    });
});

app.get('/hartbeat', function (req, res) {
    res.send(200);
})
app.get('/mytest', function(req, res){
    var m = {"firstName":"John", "lastName":"Doe"};
    res.send(m);
    res.sendStatus(200)
})

app.post('/generate_frames', function(req, res) {
    var x = {};
    decode(req, logger, x);
    res.send(x);
    res.sendStatus(201);
});


app.listen(config.server.port, function () {
    logger.info('Server started listening on %d', config.server.port);
});
