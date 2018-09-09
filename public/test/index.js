'use strict';

const lserver = require('./server')

let myContent = {
    id: 'test'
}

lserver.loadLogic('client')
lserver.attachLogic('client', myContent,function (cntx) {
    cntx.logic.start.func(cntx)

    setInterval(() => {
        lserver.runStep(cntx)
    },3000)
})