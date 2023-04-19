var webSocket;

var messageDiv; 

var textInput;

var respuesta;


var hostURL;

var websocketReadyStateArray;

var connectBtn;

var sendTextBtn;

var sendJSONObjectBtn;

var disconnectBtn;

function init(){

    messageDiv = document.getElementById("message"); 

    textInput = document.getElementById("text");

    respuesta="";
   

    hostURL = "ws://localhost:9999/socket";

    websocketReadyStateArray = new Array('Connecting', 'Connected', 'Closing', 'Closed');

    connectBtn = document.getElementById('connect');

    sendTextBtn = document.getElementById('sendText');

    sendJSONObjectBtn = document.getElementById('sendJSONObject');

    disconnectBtn = document.getElementById('disconnect');

    connectBtn.disabled = false;

    sendTextBtn.disabled = true;

    sendJSONObjectBtn.disabled = true;

    disconnectBtn.disabled = true;
}


function connect(){

    try{

        webSocket = new WebSocket(hostURL);

        messageDiv.innerHTML = "<p>Socket status:" + websocketReadyStateArray[webSocket.readyState] + "</p>";

        webSocket.onopen = function(){

            messageDiv.innerHTML += "<p>Socket status:" + websocketReadyStateArray[webSocket.readyState] + "</p>";

            connectBtn.disabled = true;

            sendTextBtn.disabled = false;

            sendJSONObjectBtn.disabled = false;

            disconnectBtn.disabled = false;


        }

        webSocket.onmessage = function(msg){

            messageDiv.innerHTML += "<p>Respuesta servidor : " + msg.data + "</p>";
        }

        webSocket.onclose = function(){

            messageDiv.innerHTML += "<p>Socket status:" + websocketReadyStateArray[webSocket.readyState] + "</p>";

            connectBtn.disabled = false;

            sendTextBtn.disabled = true;

            sendJSONObjectBtn.disabled = true;

            disconnectBtn.disabled = true;
        }

    }catch(exception){

        messageDiv.innerHTML += 'Exception , ' + exception;
    }
}



function sendText(){
    

    var sendText = textInput.value.trim()+respuesta.trim();

    if(sendText==''){
        
        messageDiv.innerHTML   = '<p>Selecciona respuesta a enviar.</p>';

        return;

    }else{

        try{
            
            webSocket.send(sendText);

            messageDiv.innerHTML = '<p>Envía: ' + sendText + '</p>'

        }catch(exception){

            messageDiv.innerHTML = '<p>error : ' + exception + '</p>'

        }
    }


}

function sendJSONOjbect(){
    

    var sendText = respuesta.trim();

    if(sendText==''){
        
        messageDiv.innerHTML = '<p>Selecciona respuesta a enviar.</p>';

        return;

    }else{

        try{



            currDate = new Date();

            currHour = currDate.getHours();

            currMinutes = currDate.getMinutes();

            currSeconds = currDate.getSeconds();
            
            currentTime = currHour + ':' + currMinutes + ':' + currSeconds;  

            var elid=textInput.value.trim();

            jsonObj = {id:elid,time:currentTime, text:sendText}

            tmpSendText = JSON.stringify(jsonObj)

            webSocket.send(tmpSendText);

            messageDiv.innerHTML = '<p>JSON a enviar : ' + tmpSendText + '</p>'

        }catch(exception){

            messageDiv.innerHTML = '<p>Error enviando : ' + exception + '</p>'

        }
    }

}

// When you focus on the input text box, it will call this function to select all the text in the input text box.
function selectAll(){

    textInput.select();

}

function elid(){

   elid=document.getElementById("elid").innerHTML();

}

function respondesi(){

    respuesta="Si";
    connect();
   

}
function respondeno(){

  respuesta="No";
  connect();


}


function disconnect(){

    webSocket.close();

}