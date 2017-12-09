var app = {
  server: 'http://parse.sfs.hackreactor.com/',
};

app.init = function() {
};

app.send = function(message) {
//      message = JSON.stringify(message.text);
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
  })
};

app.fetch = function() {
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      //contentType: 'jsonp',
      success: function (data) {
        app.renderMessage(data);
//        console.log(data);
      },
      error: function (data) {
        return console.error('no data!', data);
      }  
    });
};

app.renderMessage = function(message) {
  for (var i = message['results'].length-1; i > 0; i--){
    var prettyMessage = '<h3>' + message['results'][i]['username'] + '</h3> ' +  message['results'][i]['text'] + "    " +  message['results'][i]['createdAt'] + '<br>______________________________________';
    console.log(message['results'][i]);
    $('#chats').append(prettyMessage);
    // $('#chats').append(message['results'][i]['username']);
    // $('#chats').append(message['results'][i]['text']);
    // console.log(message['results'][i]);
  }
};

app.clearMessages = function() {

};

app.renderRoom = function() {

};

$(document).ready(function() {
  $('#sendButton').on('click', function() {
    var messageText = document.getElementById('messageBox').value;
    var message = {
      username: window.location.search.slice(10),
      text: messageText,
      roomname: 'lobby',
    };
    app.send(message);
    document.getElementById('messageBox').value = '';
  });
  $('#fetchButton').on('click', function() {
    app.fetch();
  })
  console.log(app.fetch());
});


/*

*Server:* http://parse.sfs.hackreactor.com/

*Messages endpoint:*
/chatterbox/classes/messages

REQUIREMENTS 

have a box that takes in text from the user (a message)
  send that text to the database
  ex:
    var message = {
      username: 'shawndrost',
      text: 'trololo',
      roomname: '4chan'
    };
    
  a textbox
    a button that grabs the text from that box
      format that as above
      send ajax request as below
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  
display messages from the database
  along with usernames

be able to switch rooms
  each room should have its own database????
  be able to generate new rooms

be able to click on a username and thereby add them as a friend
  bold messages from friends

*/