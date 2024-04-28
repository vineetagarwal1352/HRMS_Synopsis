document.addEventListener('DOMContentLoaded', function() {
     const toggleButton = document.getElementById('toggleButton');
     const status = document.getElementById('status');
   
     // Checking for the presence of the cookie for hrms site
     chrome.tabs.getSelected(null, function(tab) {
       chrome.cookies.getAll({ url: tab.url }, function(cookies) {
         const cookieFound = cookies.some(cookie => cookie.name === 'your_cookie_name');
   
         if (cookieFound) {
           toggleButton.disabled = false;
         } else {
           status.textContent = 'Error: Cookie not found';
         }
       });
     });
   
     // Toggle button state and display date and hours for the user attendance
     toggleButton.addEventListener('click', function() {
       if (toggleButton.textContent === 'Start') {
         toggleButton.textContent = 'Stop';
         // Code to display date and total number of hours
       } else {
         toggleButton.textContent = 'Start';
         // Code to stop the timer 
       }
     });
   });
   