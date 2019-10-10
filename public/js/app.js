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

function openNav(x) {
    x.classList.toggle("change");
    let nav  = document.getElementById("mySidenav");
    console.log(nav.style.width);
    if ( nav.style.width == "0px")
         nav.style.width = "300px";	
    else	  
         nav.style.width = "0px";	
}

function stateSelect(elem) {
    elem.style.stroke = '#ffc700'

}
function trans2Goto(elem,evt) {
    let st = elem.getAttribute('master')
    let nst = elem.getAttribute('goto')
    let lst = elem.getAttribute('listgo')
    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = '<b>' + st + ' >> ' + nst +'</b><br>'+ lst;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX - 120 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
}

function showTooltip(evt, text) {
    if(text === '') return;
    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX - 120 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
}

function hideTooltip() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
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
        .then(source => {
            //editcode.set(code);
            var code = document.getElementById("editorcode")
               ,parent = code.parentElement
                parent.removeChild(code)
                code = document.createElement("pre")
                code.id = "editorcode"
                code.className = "brush: js"
                parent.appendChild(code)
                code.textContent = source

            SyntaxHighlighter.highlight()
        })
        .catch(console.error.bind(console));
}
function buildCodeES6(json,type,lname) {
    document.getElementById("tabCODE").click();
    fetch('/data', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({oper: 'es6code',
            target: {
                width: type,
                height: lname
            },
            data: json})
    })
        .then(res => res.text())
        .then(source => {
            //editcode.set(code);
            var code = document.getElementById("editorcode")
                ,parent = code.parentElement
            parent.removeChild(code)
            code = document.createElement("pre")
            code.id = "editorcode"
            code.className = "brush: js"
            parent.appendChild(code)
            code.textContent = source

            SyntaxHighlighter.highlight()
        })
        .catch(console.error.bind(console));
}
function buildCodeSwift(json,type,lname) {
    document.getElementById("tabCODE").click();
    fetch('/data', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({oper: 'swiftcode',
            target: {
                width: type,
                height: lname
            },
            data: json})
    })
        .then(res => res.text())
        .then(source => {
            //editcode.set(code);
            var code = document.getElementById("editorcode")
                ,parent = code.parentElement
            parent.removeChild(code)
            code = document.createElement("pre")
            code.id = "editorcode"
            code.className = "brush: js"
            parent.appendChild(code)
            code.textContent = source

            SyntaxHighlighter.highlight()
        })
        .catch(console.error.bind(console));
}
function buildCodeJava(json,type,lname) {
    document.getElementById("tabCODE").click();
    fetch('/data', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({oper: 'javacode',
            target: {
                width: type,
                height: lname
            },
            data: json})
    })
        .then(res => res.text())
        .then(source => {
            //editcode.set(code);
            var code = document.getElementById("editorcode")
                ,parent = code.parentElement
            parent.removeChild(code)
            code = document.createElement("pre")
            code.id = "editorcode"
            code.className = "brush: js"
            parent.appendChild(code)
            code.textContent = source

            SyntaxHighlighter.highlight()
        })
        .catch(console.error.bind(console));
}
function buildCodePython(json,type,lname) {
    document.getElementById("tabCODE").click();
    fetch('/data', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({oper: 'pythoncode',
            target: {
                width: type,
                height: lname
            },
            data: json})
    })
        .then(res => res.text())
        .then(source => {
            //editcode.set(code);
            var code = document.getElementById("editorcode")
                ,parent = code.parentElement
            parent.removeChild(code)
            code = document.createElement("pre")
            code.id = "editorcode"
            code.className = "brush: js"
            parent.appendChild(code)
            code.textContent = source

            SyntaxHighlighter.highlight()
        })
        .catch(console.error.bind(console));
}


window.addEventListener('load', function () {
    // Add New JSON file by template
    document.getElementById('newDocument').onclick = function () {
        jsonA.prj  = window.prompt('Enter project name','myproject');
        jsonA.id = window.prompt('Enter file name','mylogic')
        editor.setText(JSON.stringify(jsonA));
        var node = document.createElement("a");                    
        node.appendChild(document.createTextNode(jsonA.id));
        node.className = "list-group-item list-group-item-action";
        node.setAttribute("data-toggle", "list");
        node.setAttribute("data-json", editor.getText());
        node.setAttribute("href", "#");
        node.setAttribute("role", "tab");
        node.setAttribute("aria-controls", jsonA.id);
        node.onclick = function () {
            editor.setText(this.getAttribute("data-json"));
        }
        document.getElementById('prj-list-tab').appendChild(node); 
    };

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

    var schema = {
        "description": "Dynamic attachment finite state machine schema",
        "type": "object",
        "required": ["id","type","project","start","stop"],
        "properties": {
            "id": {
                "type": "string"
            },
            "type": {
                "type": "string"
            },
            "project": {
                "type": "string"
            },
            "start": {
                "type": "object",
                "required": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "pattern": "^func_*"
                    }
                }
            },
            "stop": {
                "type": "object",
                "required": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "pattern": "^func_*"
                    }
                }
            },
            "states": {
                "type": "object",
                "required": ["init","final"],
                "properties": {
                    "init": {
                        "type": "object",
                        "required": ["name","transitions"],
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "exits": {
                                "type": "array"
                            },
                            "transitions": {
                                "type": "array"
                            }
                        }
                    },
                    "final": {
                        "type": "object",
                        "required": ["name"],
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "entries": {
                                "type": "array"
                            }
                        }
                    }

                }
            }
        }
    };

    var jsonO = {
        "id": "client",
        "type": "FSM",
        "prj": "tb_",
        "complete": false,
        "start": {
            "name": "fn_initialize"
        },
        "stop": {
            "name": "fn_finishing"
        },
        "countstates": 4,
        "states": {
            "init": {
                "key": "init",
                "name": "InitialState",
                "transitions": [
                    {
                        "nextstatename": "final",
                        "triggers": [
                            {
                                "name": "ev_outOfService"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_outOfServiceMsg"
                            }
                        ]
                    },
                    {
                        "nextstatename": "ready",
                        "triggers": [
                            {
                                "name": "ev_checkEnvComplete"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_signIn"
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
                        "name": "fn_updateActiveMembersList"
                    }
                ],
                "exits": [
                    {
                        "name": "fn_startPacketStatistics"
                    }
                ],
                "stays": [
                    {
                        "name": "fn_readyStay"
                    }
                ],
                "transitions": [
                    {
                        "nextstatename": "connect",
                        "triggers": [
                            {
                                "name": "ev_inviteCall_acceptCall"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_reqCreateSession_reqTokenSession"
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
                        "name": "fn_initSession"
                    },
                    {
                        "name": "fn_publishStreams"
                    },
                    {
                        "name": "fn_showVideos"
                    }
                ],
                "exits": [
                    {
                        "name": "fn_stopPacketStatistics"
                    },
                    {
                        "name": "fn_storeStatistics"
                    }
                ],
                "stays": [
                    {
                        "name": "fn_connectStay"
                    }
                ],
                "transitions": [
                    {
                        "nextstatename": "final",
                        "triggers": [
                            {
                                "name": "ev_networkProblem"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_reportProblem"
                            }
                        ]
                    },
                    {
                        "nextstatename": "ready",
                        "triggers": [
                            {
                                "name": "ev_hangUp"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_disconnectSession"
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
                        "name": "fn_finallyReport"
                    }
                ]
            }
        }
    };

    var jsonA = {
        "id": "client",
        "type": "FSM",
        "prj": "tb_",
        "complete": false,
        "start": {
            "name": "fn_initialize"
        },
        "stop": {
            "name": "fn_finishing"
        },
        "countstates": 4,
        "states": [
            {
                "key": "init",
                "name": "InitialState",
                "transitions": [
                    {
                        "nextstatename": "final",
                        "triggers": [
                            {
                                "name": "ev_outOfService"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_outOfServiceMsg"
                            }
                        ]
                    },
                    {
                        "nextstatename": "ready",
                        "triggers": [
                            {
                                "name": "ev_checkEnvComplete"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_signIn"
                            }
                        ]
                    }
                ]
            },
            {
                "key": "ready",
                "name": "readyState",
                "entries": [
                    {
                        "name": "fn_updateActiveMembersList"
                    }
                ],
                "exits": [
                    {
                        "name": "fn_startPacketStatistics"
                    }
                ],
                "stays": [
                    {
                        "name": "fn_readyStay"
                    }
                ],
                "transitions": [
                    {
                        "nextstatename": "connect",
                        "triggers": [
                            {
                                "name": "ev_inviteCall_acceptCall"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_reqCreateSession_reqTokenSession"
                            }
                        ]
                    }
                ]
            },
            {
                "key": "connect",
                "name": "connectState",
                "entries": [
                    {
                        "name": "fn_initSession"
                    },
                    {
                        "name": "fn_publishStreams"
                    },
                    {
                        "name": "fn_showVideos"
                    }
                ],
                "exits": [
                    {
                        "name": "fn_stopPacketStatistics"
                    },
                    {
                        "name": "fn_storeStatistics"
                    }
                ],
                "stays": [
                    {
                        "name": "fn_connectStay"
                    }
                ],
                "transitions": [
                    {
                        "nextstatename": "final",
                        "triggers": [
                            {
                                "name": "ev_networkProblem"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_reportProblem"
                            }
                        ]
                    },
                    {
                        "nextstatename": "ready",
                        "triggers": [
                            {
                                "name": "ev_hangUp"
                            }
                        ],
                        "effects": [
                            {
                                "name": "fn_disconnectSession"
                            }
                        ]
                    }
                ]
            },
            {
                "key": "final",
                "name": "FinalState",
                "entries": [
                    {
                        "name": "fn_finallyReport"
                    }
                ]
            }
        ]
    };

    editor = new JSONEditor(container, options, {});

    // Code Syntax Highlight
    //SyntaxHighlighter.all();

}, false);