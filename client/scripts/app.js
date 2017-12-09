var app = {
  init: function() {
  },
  send: function(message) {
    // if (mess === undefined) {
    //   if (document.getElementById('messageBox')) {
    //     var messageText = document.getElementById('messageBox').value;
    //     if (messageText.length === 0) {
    //       messageText = 'you didn\'t type anything';
    //     }
    //   }
    //   console.log(messageText);
    //   var message = {
    //     username: window.location.search.slice(10),
    //     text: messageText,
    //     roomname: 'lobby',
    //   };
    // } else {
    //   var message = mess;
    // }
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    
  }
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
  });
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
  each room should have its own database
  be able to generate new rooms

be able to click on a username and thereby add them as a friend
  bold messages from friends

*/