const enableWebNotificationHeader = document.querySelector(".enable-notifications-header");
const enableWebNotificationMenu = document.querySelector(".enable-notifications-menu");

function showPermissionRequest() {
    if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
}

enableWebNotificationHeader.addEventListener("click", showPermissionRequest);
enableWebNotificationMenu.addEventListener("click", showPermissionRequest);

window.addEventListener("offline", () => {
    if ('Notification' in window && navigator.serviceWorker) {
      if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          var options = {
            body: "The app is now offline",
            icon: "/src/images/icons/apple-icon-72x72.png",
            badge: "/src/images/icons/apple-icon-72x72.png",
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1
            },
            actions: [
              {action: 'ok', title: 'Okay, thank you!'},
            ]
          };
          reg.showNotification("Internet is disabled", options);
        });
      }
    }
  });