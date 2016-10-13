'use strict';


var url = "https://abaproject.github.io/notification-data.json";
self.addEventListener('push', function(event) {
  event.waitUntil(
    fetch(url).then(function(response) {
      if (response.status !== 200) {  
        // Either show a message to the user explaining the error  
        // or enter a generic message and handle the
        // onnotificationclick event to direct the user to a web page  
        console.log('Looks like there was a problem. Status Code: ' + response.status);  
        throw new Error();  
      }
 
      // Examine the text in the response  
      return response.json().then(function(data) {  
        if (data.error || !data.notification) {  
          console.log('The API returned an error.', data.error);  
          throw new Error();  
        }  
        var title = data.notification.title;  
        var message = data.notification.message;  
        var icon = data.notification.icon;  
 
        return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          data: {
            url: data.notification.url
          }  
        });  
      });  
    }).catch(function(err) {  
      console.log('Unable to retrieve data', err);
 
      var title = 'An error occurred';
      var message = 'We were unable to get the information for this push message';  
      var icon = 'img/design19.jpg';  
      var notificationTag = 'notification-error';  
      return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          tag: notificationTag  
        });  
    })  
  );  
});
 
// The user has clicked on the notification ...
self.addEventListener('notificationclick', function(event) {  
  console.log(event.notification.data.url);
  // Android doesn't close the notification when you click on it  
  // See: http://crbug.com/463146  
  event.notification.close();
 
  // This looks to see if the current is already open and  
  // focuses if it is  
  event.waitUntil(
    clients.matchAll({  
      type: "window"  
    })
    .then(function(clientList) {  
      for (var i = 0; i < clientList.length; i++) {  
        var client = clientList[i];  
        if (client.url == '/' && 'focus' in client)  
          return client.focus();  
      }  
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);  
      }
    })
  );
});
