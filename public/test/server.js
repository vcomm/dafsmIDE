'use strict';

let context = {
    ev_Proc: function(msg) {
        // some receive msg processing
        // for nodejs call: dafsm.event(context.fsm)
        // for webjs  call: DAFSM.event(context.fsm)
    },
    lib: {
        fn_initialize: function(cntx) {
            console.log('fn_initialize')
        }
        ,fn_finishing: function(cntx) {
            console.log('fn_finishing')
        }
        ,ev_outOfService: function(cntx) {
            console.log('fn_finishing')
        }
        ,fn_outOfServiceMsg: function(cntx) {
            console.log('fn_outOfServiceMsg')
        }
        ,ev_checkEnvComplete: function(cntx) {
            console.log('ev_checkEnvComplete')
        }
        ,fn_signIn: function(cntx) {
            console.log('fn_signIn')
        }
        ,fn_startPacketStatistics: function(cntx) {
            console.log('fn_startPacketStatistics')
        }
        ,fn_readyStay: function(cntx) {
            console.log('fn_readyStay')
        }
        ,fn_updateActiveMembersList: function(cntx) {
            console.log('fn_updateActiveMembersList')
        }
        ,ev_inviteCall_acceptCall: function(cntx) {
            console.log('fn_updateActiveMembersList')
        }
        ,fn_reqCreateSession_reqTokenSession: function(cntx) {
            console.log('fn_reqCreateSession_reqTokenSession')
        }
        ,fn_stopPacketStatistics: function(cntx) {
            console.log('fn_reqCreateSession_reqTokenSession')
        }
        ,fn_storeStatistics: function(cntx) {
            console.log('fn_storeStatistics')
        }
        ,fn_connectStay: function(cntx) {
            console.log('fn_connectStay')
        }
        ,fn_initSession: function(cntx) {
            console.log('fn_connectStay')
        }
        ,fn_publishStreams: function(cntx) {
            console.log('fn_publishStreams')
        }
        ,fn_showVideos: function(cntx) {
            console.log('fn_showVideos')
        }
        ,ev_networkProblem: function(cntx) {
            console.log('ev_networkProblem')
        }
        ,fn_reportProblem: function(cntx) {
            console.log('fn_reportProblem')
        }
        ,ev_hangUp: function(cntx) {
            console.log('fn_reportProblem')
        }
        ,fn_disconnectSession: function(cntx) {
            console.log('ev_hangUp')
        }
        ,fn_finallyReport: function(cntx) {
            console.log('fn_reportProblem')
        }
    }
}

let wrapper  = (function () {
    let logicsStore = {};
    const dafsm = require('dafsm').FDAFSM
    return {
        loadLogic: function(name) {
            logicsStore[name] = require('../../logic/'+name+'.json')
        }
        ,attachLogic: function(name,mycntx,cblk) {
            new Promise(function(resolve, reject) {
                if(logicsStore[name]) {
                    resolve(logicsStore[name])
                } else {
                    reject(new Error("Logic not exist!"))
                }
            })
                .then(fsm => {
                    return dafsm.link(fsm,context)
                })
                .then(fsm => {
                    logicsStore[name] = fsm
                    dafsm.init(fsm,mycntx)
                    //context.com = new comModule(context.ev_Proc)
                    if (cblk) {
                        cblk(mycntx)
                    }
                })
                .catch(function catchErr(error) {
                    if (error) console.error(error)
                });
        }
        ,runStep: function(cntx) {
            dafsm.event(cntx)
        }
    }
})()

module.exports = wrapper

