/**
 * Created by Justin on 5/30/2015.
 */

var socket = null;
var datasource = null;

document.addEventListener("DOMContentLoaded", function(event) {

    datasource = initSmoothie();
    reconnect();

});

function initSocket(){
    var s = new WebSocket("ws://localhost:9090");
    s.onerror = function(evt){
        addLog("Cannot connect to " + evt.target.url, 'red');
        setConnectionStatus('Failed','red');
    };
    s.onopen = function(evt){
        setConnectionStatus('Open','green');
        if(gotPath()){
            setPath();
        }
    };
    s.onclose = function(evt){
        setConnectionStatus('Closed');
        addLog('Disconnected');
    };

    s.onmessage = function(evt){
        console.log(evt);
        datasource.append(new Date().getTime(), parseFloat(evt.data));
    };

    addLog("Connecting");

    return s;
}

function gotPath(){
    var path = document.getElementById("path").value;
    return path && path != "";
}

function setPath(){
    var path = document.getElementById("path").value;
    if (gotPath()){
        socket.send(path);
    } else {
        addLog("Set a path", 'red');
    }
}

function initSmoothie(){
    var x = new SmoothieChart();
    x.streamTo(document.getElementById("chart"), 100);
    var line = new TimeSeries();
    x.addTimeSeries(line);
    return line;
}

function reconnect(){
    socket = initSocket();
}

function setConnectionStatus(status, color){
    var s = document.getElementById("status");
    s.innerHTML = status;
    if(color && color != ""){
        s.style.color = color;
    } else {
        s.style.color = 'black';
    }
}

function addLog(msg, color){
    var errors = document.getElementById("errors");
    var li = document.createElement("li");
    li.innerHTML = (new Date()).toLocaleString() + " - " + msg;
    if(color && color != ""){
        li.style.color = color;
    }
    errors.insertBefore(li, errors.firstChild);
}