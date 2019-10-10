'use strict'

const pyPatern = (function () {
    
    let bodyBios = []

    function sourceGenerator(logic) {
        bodyBios = []
        let str = ''
        console.info(`sourceGenerator`)
        try {
            str += `${' '.repeat(13)}"${logic.start.name}": self.${logic.start.name},\n`+
                   `${' '.repeat(13)}"${logic.stop.name}": self.${logic.stop.name},\n`

            bodyBios.push(`def ${logic.start.name}(self):`)
            bodyBios.push(`def ${logic.stop.name}(self):`)

            if (Array.isArray(logic.states))
                logic.states.forEach(state => {
                    if (state.hasOwnProperty("exits")) {
                        state.exits.forEach(action => {
                            bodyBios.push(`def ${action.name}(self):`)
                            str += `${' '.repeat(13)}"${action.name}": self.${action.name},\n`
                        })
                    }
                    if (state.hasOwnProperty("stays")) {
                        state.stays.forEach(action => {
                            bodyBios.push(`def ${action.name}(self):`)
                            str += `${' '.repeat(13)}"${action.name}": self.${action.name},\n`
                        })
                    }
                    if (state.hasOwnProperty("entries")) {
                        state.entries.forEach(action => {
                            bodyBios.push(`def ${action.name}(self):`)
                            str += `${' '.repeat(13)}"${action.name}": self.${action.name},\n`
                        })
                    }
                    if (state.hasOwnProperty("transitions")) {
                        state.transitions.forEach(trans => {
                            if (trans.hasOwnProperty("triggers")) {
                                trans.triggers.forEach(trig => {
                                    bodyBios.push(`def ${trig.name}(self):`)
                                    str += `${' '.repeat(13)}"${trig.name}": self.${trig.name},\n`
                                })
                            }
                            if (trans.hasOwnProperty("effects")) {
                                trans.effects.forEach(effect => {
                                    bodyBios.push(`def ${effect.name}(self):`)
                                    str += `${' '.repeat(13)}"${effect.name}": self.${effect.name},\n`
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
                            str += `${' '.repeat(13)}"${action.name}": self.${action.name},\n`
                        })
                    }
                    if (state.hasOwnProperty("stays")) {
                        state.stays.forEach(action => {
                            str += `${' '.repeat(13)}"${action.name}": self.${action.name},\n`
                        })
                    }
                    if (state.hasOwnProperty("entries")) {
                        state.entries.forEach(action => {
                            str += `${' '.repeat(13)}"${action.name}": self.${action.name},\n`
                        })
                    }
                    if (state.hasOwnProperty("transitions")) {
                        state.transitions.forEach(trans => {
                            if (trans.hasOwnProperty("triggers")) {
                                trans.triggers.forEach(trig => {
                                    str += `${' '.repeat(13)}"${trig.name}": self.${trig.name},\n`
                                })
                            }
                            if (trans.hasOwnProperty("effects")) {
                                trans.effects.forEach(effect => {
                                    str += `${' '.repeat(13)}"${effect.name}": self.${effect.name},\n`
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
        let str = '#Declare < def > for synchronous functions, < async def > for asynchronous\n'
        str += '#Trigger/Event declared with < dev ev_*: > function must be retrun True or False\n\n'
        bodyBios.forEach(func => {
            str += `${' '.repeat(5)}${func}\n`
            str += `${' '.repeat(10)}return\n\n`
        })
        return str;
    }
    return {
        code: function (fsm,bside,library) {
            let code = `#Download dafsm engine from: https://github.com/vcomm/dafsm-py\n\n`
            code += `from mngeng import *\n`

            code += `\n\nclass ${library}(Content):`
            code += `\n\n    def __init__(self, name):`
            code += `\n         super().__init__(name)`
            code += `\n\n    def bios(self):`
            code += `\n         return {\n`
            code += `${sourceGenerator(fsm)}`
            code += `\n         }\n\n`

            code += `${funcBody()}\n\n`

            code += `\nengine = AsyncWrapper('engine')`
            code += `\ndata = engine.init(engine.load(engine.read('mainloop.json')), ${library})`
            code += `\ndata.engine(data, engine)`
            code += `\nprint('Validate: ', engine.validate('mainloop', data))`
            code += `\n#If Validation is True , code generation is consistency with algorithm describe in json file`
            code += `\n#When Event Alert after determinate data will be call`
            code += `\n\n# if data.get(data)["complete"] is not True:`
            code += `\n#     data = data.emit(data)`
            code += `\n\n`
            
            return code;
        }
    }
})()

module.exports = pyPatern