(function() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startstopbutton = null;
  var permissionNotGiven = true;
  var permissionBeingAsked = false;
  var stopSesh = true;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startstopbutton = document.getElementById('startstopbutton');

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
      }
      else {
        startstopbutton.innerHTML = "Start Session";
        stopSesh = true;
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
        },
        function(err) {
          permissionNotGiven = true;
          permissionBeingAsked = false;
          startstopbutton.innerHTML = "Start Session";
          stopSesh = true;
          console.log("An error occured! " + err);
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
         /// call your function here
         if(!stopSesh)
         {
           takepicture()
         }
  }, 5000);  // Change Interval here to test. For eg: 5000 for 5 sec

})();
