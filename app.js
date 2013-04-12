$(function(){

  var video, context, canvas;
  // what point in the video that we're going to put the text in
  var insertionIndex = 1000;

  $('#sentence').focus();
  $('body').keydown(function(){
    $('#sentence').focus();
  });

  function getBase64Image(img) {
    // Create an empty canvas element
    canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    var dataURL = canvas.toDataURL("image/jpeg");

    return dataURL;
  }


  function readFrame() {
    try {
      context.drawImage(video, 0, 0, width, height);
    } catch (e) {
      // The video may not be ready, yet.
      return null;
    }

    return context.getImageData(0, 0, width, height);
  }

  function draw() {
    var frame = readFrame();
    if (frame) {
      context.putImageData(frame, 0, 0);
    }

    corrupt(canvas.toDataURL("image/jpeg"));

    // Wait for the next frame.
    requestAnimationFrame(draw);
  }

  function startStream(stream) {
    video.src = URL.createObjectURL(stream);
    video.play();

    // Ready! Let's start drawing.
    requestAnimationFrame(draw);
  }

  function initialize() {
    // The source video.
    video = document.getElementById("webcam");
    width = video.width;
    height = video.height;

    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');


    navigator.getUserMedia({video: true}, startStream, function () {});
  }

  initialize();


  function dataURItoBlob(dataURI, callback) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    var sentence = $('#sentence').val();
    for (var i = 0; i < sentence.length; i++) {
     array[insertionIndex + i] = sentence[i];
    }

    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  function corrupt(uri) {
    blob = dataURItoBlob(uri);
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function(evt) {
      document.getElementById('result').src = evt.target.result;
    };
  }

});