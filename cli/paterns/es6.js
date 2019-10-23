'use strict'

const es6Patern = (function () {
    
    let bodyBios = []
    let funcList = {}

    function sourceGenerator(logic) {
        bodyBios = []
        funcList = {}
        let str = ''
        console.info(`sourceGenerator`)
        try {
            str += `         ${logic.start.name}: this.${logic.start.name}\n`+
                   `        ,${logic.stop.name}: this.${logic.stop.name}\n`

            bodyBios.push(`${logic.start.name}(cntx)`)
            bodyBios.push(`${logic.stop.name}(cntx)`)

            if (Array.isArray(logic.states))
                logic.states.forEach(state => {
                    if (state.hasOwnProperty("exits")) {
                        state.exits.forEach(action => {
                            if (checkFuncList(action.name)) {
                                bodyBios.push(`${action.name}(cntx)`)
                                str += `        ,${action.name}: this.${action.name}\n`
                            }
                        })
                    }
                    if (state.hasOwnProperty("stays")) {
                        state.stays.forEach(action => {
                            if (checkFuncList(action.name)) {
                                bodyBios.push(`${action.name}(cntx)`)
                                str += `        ,${action.name}: this.${action.name}\n`
                            }
                        })
                    }
                    if (state.hasOwnProperty("entries")) {
                        state.entries.forEach(action => {
                            if (checkFuncList(action.name)) {
                                bodyBios.push(`${action.name}(cntx)`)
                                str += `        ,${action.name}: this.${action.name}\n`
                            }
                        })
                    }
                    if (state.hasOwnProperty("transitions")) {
                        state.transitions.forEach(trans => {
                            if (trans.hasOwnProperty("triggers")) {
                                trans.triggers.forEach(trig => {
                                    if (checkFuncList(trig.name)) {
                                        bodyBios.push(`${trig.name}(cntx)`)
                                        str += `        ,${trig.name}: this.${trig.name}\n`
                                    }
                                })
                            }
                            if (trans.hasOwnProperty("effects")) {
                                trans.effects.forEach(effect => {
                                    if (checkFuncList(effect.name)) {
                                        bodyBios.push(`${effect.name}(cntx)`)
                                        str += `        ,${effect.name}: this.${effect.name}\n`
                                    }
                                })
                            }
                        })
                    }
                })
            else
                for(let key of Object.keys(logic.states)) {
                    let state = logic.states[key]
                    if (state.hasOwnProperty("exits")) {
                        state.exits.forEach(action => {
                            if (checkFuncList(action.name)) {
                                bodyBios.push(`${action.name}(cntx)`)
                                str += `        ,${action.name}: this.${action.name}\n`
                            }
                        })
                    }
                    if (state.hasOwnProperty("stays")) {
                        state.stays.forEach(action => {
                            if (checkFuncList(action.name)) {
                                bodyBios.push(`${action.name}(cntx)`)
                                str += `        ,${action.name}: this.${action.name}\n`
                            }
                        })
                    }
                    if (state.hasOwnProperty("entries")) {
                        state.entries.forEach(action => {
                            if (checkFuncList(action.name)) {
                                bodyBios.push(`${action.name}(cntx)`)
                                str += `        ,${action.name}: this.${action.name}\n`
                            }
                        })
                    }
                    if (state.hasOwnProperty("transitions")) {
                        state.transitions.forEach(trans => {
                            if (trans.hasOwnProperty("triggers")) {
                                trans.triggers.forEach(trig => {
                                    if (checkFuncList(trig.name)) {
                                        bodyBios.push(`${trig.name}(cntx)`)
                                        str += `        ,${trig.name}: this.${trig.name}\n`
                                    }
                                })
                            }
                            if (trans.hasOwnProperty("effects")) {
                                trans.effects.forEach(effect => {
                                    if (checkFuncList(effect.name)) {
                                        bodyBios.push(`${effect.name}(cntx)`)
                                        str += `        ,${effect.name}: this.${effect.name}\n`
                                    }
                                })
                            }
                        })
                    }
                }
        } catch(e) {
            console.error('Error: ' + e.name + ":" + e.message + "\n" + e.stack);
        } finally {
            return str;
        }        
    }
    function funcBody() {
        let str = `\n/* Declare  < async > for asynchronous functions */\n\n`
            str += `/* Use follow pattern code for async function body  */\n\n`
            str += `/* return (new Promise((resolve,reject) => { <your code> resolve(cntx)/reject(error) })).then(data => { <your code> return data; });*/\n\n`
            str += `/* Trigger/Event declared with < ev_*: > function must be return true or false*/\n\n`
        bodyBios.forEach(func => {
            str += `${' '.repeat(5)}${func} {\n`
            str += `${' '.repeat(10)}return\n`
            str += `${' '.repeat(5)}}\n`
        })
        return str;
    }
    function checkFuncList(fname) {
        if (funcList.hasOwnProperty(fname)) 
            return false
        else {
            funcList[fname] = true
            return true
        }
    }
    return {
        code: function (fsm,bside,library) {
            let code = `'use strict'\n\n`
            if (bside) {
                code += `/* include in package.json in dependencies: */\n`
                code += `/* "dafsm": "git+https://github.com/vcomm/dafsm-node.git" */\n\n`
                code += `const wrapper  = require('dafsm').WRAPPER\n`
                code += `const asyncwrapper  = require('dafsm').ASYNCWRAPPER\n`
            } else {
                code += `\n // include in html <script src='/scripts/dafsm/src/dafsm.js'></script>`;
            }

            code += `\n\n class ${library} extends require('dafsm').CONTENT {`
            code += `\n\n    constructor(){`
            code += `\n       super('myDataFlow')`
            code += `\n    }`
            code += `\n\n    bios() { `
            code += `\n       return {\n`
            code += sourceGenerator(fsm)
            code += `\n       }`
            code += `\n    }`
            code += `${funcBody()}\n`
            code += ` }\n\n`
            
            code += `const myCntn = new ${library}()\n\n`  
            code += `const path = '.././json/' /* path to json directory */\n\n`   
            code += `const engine = new asyncwrapper(path)\n\n`  
            code += `engine.init(engine.load(engine.read('mainloop.json')), myCntn)\n\n`
            code += `myCntn.engine(engine)\n\n` 
            code += `/* If Validation is true , code generation is consistency with algorithm describe in json file */\n\n`           
            code += `console.debug('Validate: ', engine.validate('mainloop', myCntn))\n\n`
            code += `/* When EventEmitter Alert determinate actual data will be call */\n\n`
            code += `if (myCntn.get()['complete'] != true)\n`
            code += `    myCntn.emit()\n\n`
            return code;
        }
    }
})()

module.exports = es6Patern