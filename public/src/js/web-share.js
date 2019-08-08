const shareBtn = document.querySelector(".enable-web-share");

shareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'My awesome post!',
        text: 'This post may or may not contain the answer to the universe',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(err => {
        console.log(`Press 'Cancel' button`, err.message);
      });
    } else {
      alert('web share not supported');
    }
  });

