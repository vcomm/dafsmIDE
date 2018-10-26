'use strict'

const PORT = process.env.PORT || 3000

const express = require('express')
const bodyParser = require('body-parser')
const chartFSM = require('./cli/primitives/fsm')
const jsCode = require('./cli/paterns/javascript')
const es6Code = require('./cli/paterns/es6')
const swiftCode = require('./cli/paterns/swift')
const javaCode = require('./cli/paterns/java')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set public folder as root
app.use(express.static(__dirname + '/public'));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Provide dynamic load clients logic
app.get('/blogic', function(req, res) {
    var lname = req.query.lname ? req.query.lname : 'client'
    console.log('Request Logic: ',lname)
    res.json(require('./logic/'+lname+'.json'))
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

let operation = {
    fsm : function (res,data,w,h) {
        res.setHeader('Content-Type', 'image/svg+xml')
        return chartFSM.draw(data,w,h)
    },
    jscode: function (res,data,type,libname) {
        res.setHeader('Content-Type', 'application/javascript'/*'text/plain'*/)
        return jsCode.code(data,type,libname)
    },
    es6code: function (res,data,type,libname) {
        //let sdk = asyncCall(`${__dirname}/node_modules/dafsm/lib/cdafsm.js`)
        let bside = (type === 'es6') ? true : false
        res.setHeader('Content-Type', 'application/javascript')
        return es6Code.code(data,bside,libname)
    },
    swiftcode: function (res,data,type,libname) {
        let bside = (type === 'swift') ? true : false
        res.setHeader('Content-Type', 'application/javascript')
        return swiftCode.code(data,bside,libname)
    },
    javacode: function (res,data,type,libname) {
        let bside = (type === 'java') ? true : false
        res.setHeader('Content-Type', 'application/javascript')
        return javaCode.code(data,bside,libname)
    }
}

app.post('/data', function(req, res) {
    console.log("recv msg :",req.body);
//    res.setHeader('Content-Type', 'image/svg+xml');
    res.status('200').send(
        operation[req.body.oper](res,req.body.data,
                                 req.body.target.width,
                                 req.body.target.height));
})

/*
function readFile(file) {
    const fs = require('fs');
    return new Promise((resolve,reject) => {
        fs.readFile(file, 'utf8',
            function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    })
}

async function asyncCall(file) {
    var result =  await readFile(file)
//    console.log(result)
    return result
}
*/
//asyncCall(`${__dirname}/node_modules/dafsm/lib/cdafsm.js`)

