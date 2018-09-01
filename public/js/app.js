var editor = null, editcode = null;

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function reqData(param) {
    fetch(param.url + param.route, {
        method: param.method,
        headers: param.header,
        body: param.body ? JSON.stringify(param.body) : null
    })
        .then(res => { return res.json(); })
        .then(data => param.func(data))
        .catch(function catchErr(error) {
            console.error(error);
            alert('Failed to: ', param.route);
        });
}
function buildFsm(json) {
    var elem = document.getElementById("FSM")
    //console.log(`width: ${elem.offsetWidth}, height: ${elem.offsetHeight}`)
    document.getElementById("tabFSM").click();
    fetch('/data', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({oper: 'fsm',
            target: {
                width: elem.offsetWidth-25,
                height: elem.offsetHeight-12
            },
            data: json})
    })
        .then(res => res.text())
        .then(svg => {
            elem.innerHTML = svg;
        })
        .catch(console.error.bind(console));
}
function buildCodeJS(json,type,lname) {
    document.getElementById("tabCODE").click();
    fetch('/data', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({oper: 'jscode',
            target: {
                width: type,
                height: lname
            },
            data: json})
    })
        .then(res => res.text())
        .then(code => {
            editcode.set(code);
        })
        .catch(console.error.bind(console));
}


window.addEventListener('load', function () {
    // Load a JSON document
    FileReaderJS.setupInput(document.getElementById('loadDocument'), {
        readAsDefault: 'Text',
        on: {
            load: function (event, file) {
                editor.setText(event.target.result);
            }
        }
    });

    // Save a JSON document
    document.getElementById('saveDocument').onclick = function () {
        // Save Dialog
        fname = window.prompt("Save as...");

        // Check json extension in file name
        if(fname.indexOf(".")==-1){
            fname = fname + ".json";
        }else{
            if(fname.split('.').pop().toLowerCase() == "json"){
                // Nothing to do
            }else{
                fname = fname.split('.')[0] + ".json";
            }
        }
        var blob = new Blob([editor.getText()], {type: 'application/json;charset=utf-8'});
        saveAs(blob, fname);
    };

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

    // JSON Editor
    var container = document.getElementById('jsoneditor');

    var options = {
        mode: 'tree',
        modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
        onError: function (err) {
            alert(err.toString());
        },
        onModeChange: function (newMode, oldMode) {
            console.log('Mode switched from', oldMode, 'to', newMode);
        }
    };

    var json = {
        "id": "client",
        "type": "FSM",
        "prj": "tb_",
        "complete": false,
        "context": null,
        "start": {
            "name": "fn_initialize",
            "func": null
        },
        "stop": {
            "name": "fn_finishing",
            "func": null
        },
        "countstates": 4,
        "states": {
            "init": {
                "key": "init",
                "name": "InitialState",
                "transitions": [
                    {
                        "nextstate": null,
                        "nextstatename": "final",
                        "triggers": [
                            {
                                "name": "ev_outOfService",
                                "func": null
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_outOfServiceMsg",
                                "func": null
                            }
                        ]
                    },
                    {
                        "nextstate": null,
                        "nextstatename": "ready",
                        "triggers": [
                            {
                                "name": "ev_checkEnvComplete",
                                "func": null
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_signIn",
                                "func": null
                            }
                        ]
                    }
                ]
            },
            "ready": {
                "key": "ready",
                "name": "readyState",
                "entries": [
                    {
                        "name": "fn_updateActiveMembersList",
                        "func": null
                    }
                ],
                "exits": [
                    {
                        "name": "fn_startPacketStatistics",
                        "func": null
                    }
                ],
                "stays": [
                    {
                        "name": null,
                        "func": null
                    }
                ],
                "transitions": [
                    {
                        "nextstate": null,
                        "nextstatename": "connect",
                        "triggers": [
                            {
                                "name": "ev_inviteCall_acceptCall",
                                "func": null
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_reqCreateSession_reqTokenSession",
                                "func": null
                            }
                        ]
                    }
                ]
            },
            "connect": {
                "key": "connect",
                "name": "connectState",
                "entries": [
                    {
                        "name": "fn_initSession",
                        "func": null
                    },
                    {
                        "name": "fn_publishStreams",
                        "func": null
                    },
                    {
                        "name": "fn_showVideos",
                        "func": null
                    }
                ],
                "exits": [
                    {
                        "name": "fn_stopPacketStatistics",
                        "func": null
                    },
                    {
                        "name": "fn_storeStatistics",
                        "func": null
                    }
                ],
                "stays": [
                    {
                        "name": null,
                        "func": null
                    }
                ],
                "transitions": [
                    {
                        "nextstate": null,
                        "nextstatename": "final",
                        "triggers": [
                            {
                                "name": "ev_networkProblem",
                                "func": null
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_reportProblem",
                                "func": null
                            }
                        ]
                    },
                    {
                        "nextstate": null,
                        "nextstatename": "ready",
                        "triggers": [
                            {
                                "name": "ev_hangUp",
                                "func": null
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_disconnectSession",
                                "func": null
                            }
                        ]
                    }
                ]
            },
            "final": {
                "key": "final",
                "name": "FinalState",
                "entries": [
                    {
                        "name": "fn_finallyReport",
                        "func": null
                    }
                ]
            }
        }
    };

    editor = new JSONEditor(container, options, json);

    // Code Editor

    editcode = new JSONEditor(document.getElementById('editorcode'), {
            mode: 'code',
            modes: ['code', 'text'], // allowed modes
            onError: function (err) {
                alert(err.toString());
            },
            onModeChange: function (newMode, oldMode) {
                console.log('Mode switched from', oldMode, 'to', newMode);
            }});
    //editcode.set({});

}, false);