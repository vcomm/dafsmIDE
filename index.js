'use strict'

const PORT = process.env.PORT || 3000

const express = require('express');
const bodyParser = require('body-parser');
const chartFSM = require('dafsm').fsmChart;
const jsCode = require('dafsm').jsPatern

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set public folder as root
app.use(express.static(__dirname + '/public'));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

let operation = {
    fsm : function (res,data,w,h) {
        res.setHeader('Content-Type', 'image/svg+xml')
        return chartFSM.draw(data,w,h)
    },
    jscode: function (res,data,type,libname) {
        res.setHeader('Content-Type', 'application/javascript'/*'text/plain'*/)
        return jsCode.code(data,type,libname)
    }
}

app.post('/data', function(req, res) {
//    console.log("recv msg :",req.body);
//    res.setHeader('Content-Type', 'image/svg+xml');
    res.status('200').send(
        operation[req.body.oper](res,req.body.data,
                                 req.body.target.width,
                                 req.body.target.height));
})