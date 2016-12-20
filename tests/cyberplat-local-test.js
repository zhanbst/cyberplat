var assert = require('assert');
var Cyberplat = require('../index')
var moment = require('moment');
var Parser = require('../lib/parser');

describe("Cyberplat", function() {

    var http = require('http');

    var handle = function (req, res) {
        res.end("good message");
        //done();
    };

    var port = 8998;
    var server = http.createServer(handle);

    server.listen(port, function(){
        //console.log("start server")
    });


    it("check create", function(done) {
        var cyberplat = new Cyberplat({
            crypto: {
                libPath: './tests/libipriv',
                secretKey: './tests/secret.key',
                secretPhrase: '1111111111'   //password
            },
            settings: {
                SD: 17031,
                AP: 17032,
                OP: 17034,
                useHTTPS: false,
                payCheckUrl: "http://localhost:8998"
            },
            debug: true
        });

        var obj = {
            DATE: moment().format("DD.MM.YYYY HH:mm:ss"),
            AMOUNT: "1.00",
            AMOUNT_ALL: "1.00",
            COMMENT: "mimi",
            TERM_ID: "1",
            NUMBER: "8888888888",
            REQ_TYPE: 0,
            SESSION: "4b34d1d400000cb80029"
        };

        cyberplat.payCheck("227", obj, function(err, answer) {
            console.log(answer);
            done();
        });

    }); 
    
});