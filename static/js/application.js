var inbox = new ReconnectingWebSocket("ws://"+ location.host + "/receive");
var outbox = new ReconnectingWebSocket("ws://"+ location.host + "/submit");

inbox.onmessage = function(message) {
  console.log(message);
  var data = JSON.parse(message.data);
  console.log( data.length );
  var name = data.handle;
  var content = data.text;

  //our own text
  if ( $("#input-handle")[0].value = name ) {
  
    $("#chat-text").append("<div class='panel panel-default words my-words'><div class='panel-body'>" + $('<span/>').text(data.text + "  --> length = " + data.length).html() + "</div></div>");   

  }
  else{

     $("#chat-text").append("<div class='panel panel-default words his-words'><div class='panel-body'>" + $('<span/>').text(data.text + "  --> length = " + data.length).html() + "</div></div>");

  }

  
  $("#chat-text").stop().animate({
    scrollTop: $('#chat-text')[0].scrollHeight
  }, 800);
};

inbox.onclose = function(){
    console.log('inbox closed');
    this.inbox = new WebSocket(inbox.url);

};

outbox.onclose = function(){
    console.log('outbox closed');
    this.outbox = new WebSocket(outbox.url);
};

$("#input-form").on("submit", function(event) {
  event.preventDefault();
  var handle = $("#input-handle")[0].value;
  var text   = $("#input-text")[0].value;
  var stringifyText = JSON.stringify({handle: handle, text: text} );
  outbox.send(JSON.stringify({ handle: handle, text: text }));
  $("#input-text")[0].value = "";
  console.log(stringifyText);
});
