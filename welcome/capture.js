(function() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var timer = null;
  var contentHolder = null;
  var countTVholder = null;
  var positiveTV = null;
  var negativeTV = null;
  var neutralTV = null;
  var startstopbutton = null;
  var permissionNotGiven = true;
  var permissionBeingAsked = false;
  var stopSesh = true;

  var globalSeconds = 0;
  var globalMinutes = 0;
  var globalHours = 0;

  var positiveCount = 0;
  var negativeCount = 0;
  var neutralCount = 0;
  var awayCount = 0;

  var notificationPerm = false;

  var request = new XMLHttpRequest();
  request.open("GET", "quotes.json", false);
  request.send(null)
  var quotes = JSON.parse(request.responseText);

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    timer = document.getElementById('timer');

    startstopbutton = document.getElementById('startstopbutton');

    contentHolder = document.getElementById('banner');
    countTVholder = document.getElementById('countTVholder');
    positiveTV = document.getElementById('productive');
    negativeTV = document.getElementById('stressful');
    neutralTV = document.getElementById('neutral');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        if (isNaN(height)) { // For Firefox only
          height = width / (4/3);
        }
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startstopbutton.addEventListener('click', function(ev){
      if(stopSesh)
      {
        startstopbutton.innerHTML = "Stop Session";
        stopSesh = false;
        startstopbutton.style = "background-color: #EC407A;";
        timer.classList.remove('hide');
      }
      else {
        startstopbutton.innerHTML = "Start Session";
        startstopbutton.style = "background-color: #ffe41e;";
        timer.classList.add('hide');
        stopSesh = true;
        globalSeconds = 0;
        globalMinutes = 0;
        globalHours = 0;
        timer.innerHTML = '00:00:00';
        contentHolder.classList.add('superhide');
        countTVholder.classList.remove('superhide');
      }
      ev.preventDefault();
    }, false);

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    if(permissionNotGiven && permissionBeingAsked == false)
    {
      permissionBeingAsked = true;
      navigator.getMedia(
        {
          video: true,
          audio: false
        },
        function(stream) {
          if (navigator.mozGetUserMedia) {
            video.mozSrcObject = stream;
          } else {
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
          }
          permissionNotGiven = false;
          permissionBeingAsked = false;
          Notification.requestPermission().then(function(result) {
            if (result === 'denied') {
              notificationPerm = false;
            }
            else {
              notificationPerm = true;
            }
          });
        },
        function(err) {
          permissionNotGiven = true;
          permissionBeingAsked = false;
          startstopbutton.innerHTML = "Start Session";
          startstopbutton.style = "background-color: #ffe41e;";
          stopSesh = true;
          stopSesh = true;
          globalSeconds = 0;
          globalMinutes = 0;
          globalHours = 0;
        }
      );
    }


    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var dataURL = canvas.toDataURL('image/png');

      $.ajax({
      method: 'POST',
      url: '../upload/index.php',
      data: {
      photo: dataURL,
      user_id: "11"
      },
      success: function(data2) {
        $.ajax({
          method: 'POST',
          url: '../api/emotion/index.php',
          data: {
          user_id: "11",
          time: data2
          },
          success: function(data3) {
            console.log(data3);
            if(data3 == 'positive')
            {
              positiveCount++;
            }
            if(data3 == 'negative')
            {
              negativeCount++;
            }
            if(data3 == 'neutral')
            {
              neutralCount++;
            }
            if(data3 == 'nan')
            {
              awayCount++;
            }
            if(neutralCount >= 2)
            {
              positiveCount = 0;
              negativeCount = 0;
              neutralCount = 0;

              positiveTV.innerHTML = positiveCount+' counts';
              negativeTV.innerHTML = negativeCount+' counts';
              neutralTV.innerHTML = neutralCount+' counts';

              // Notify user
              if(notificationPerm)
              {
                var randomNum = Math.floor(Math.random()*(quotes.length - 1));
                var notification = new Notification(quotes[randomNum].quote);
              }
            }
          }
              });
      }
    });

    } else {
      clearphoto();
    }
  }


  window.addEventListener('load', startup, false);

  window.setInterval(function(){
         if(!stopSesh)
         {
           takepicture();
         }
  }, 5000);  // Change Interval here to test. For eg: 5000 for 5 sec


  window.setInterval(function(){
         if(!stopSesh)
         {
           globalSeconds++;
           if (globalSeconds === 60) {
              globalMinutes++;
              globalSeconds = 0;
            }
          if (globalMinutes === 60) {
              globalHours++;
              globalMinutes = 0;
              globalSeconds = 0;
            }
          timer.innerHTML = `${("0" + globalHours).slice(-2)}:${("0" + globalMinutes).slice(-2)}:${("0" + globalSeconds).slice(-2)}`;
         }
  }, 1000);  // Change Interval here to test. For eg: 5000 for 5 sec

})();
