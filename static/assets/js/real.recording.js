// First lets hide the message
document.getElementById("alert").style.display = "none";
// Next, declare the options that will passed into the recording constructor
const options = {
  controls: true,
  bigPlayButton: false,
  width: 600,
  height: 300,
  fluid: true, // this ensures that it's responsive
  plugins: {
    wavesurfer: {
      backend: "WebAudio",
      waveColor: "#f7fff7", // change the wave color here. Background color was set in the css above
      progressColor: "#ffe66d",
      displayMilliseconds: true,
      debug: true,
      cursorWidth: 1,
      hideScrollbar: true,
      plugins: [
        // enable microphone plugin
        WaveSurfer.microphone.create({
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1,
          constraints: {
            video: false,
            audio: true,
          },
        }),
      ],
    },
    record: {
      audio: true, // only audio is turned on
      video: false, // you can turn this on as well if you prefer video recording.
      maxLength: 180, // how long do you want the recording?
      displayMilliseconds: true,
      debug: true,
    },
  },
};

// apply audio workarounds for certain browsers
applyAudioWorkaround();

// create player and pass the the audio id we created then
var player = videojs("recordAudio", options, function () {
  // print version information at startup
  var msg =
    "Using video.js " +
    videojs.VERSION +
    " with videojs-record " +
    videojs.getPluginVersion("record") +
    ", videojs-wavesurfer " +
    videojs.getPluginVersion("wavesurfer") +
    ", wavesurfer.js " +
    WaveSurfer.VERSION +
    " and recordrtc " +
    RecordRTC.version;
  videojs.log(msg);
});

// error handling
player.on("deviceError", function () {
  console.log("device error:", player.deviceErrorCode);
});

player.on("error", function (element, error) {
  console.error(error);
});

// user clicked the record button and started recording
player.on("startRecord", function () {
  // console.log("started recording!");
});

// user completed recording and stream is available
player.on("finishRecord", function () {
  const audioFile = player.recordedData;

  // console.log("finished recording: ", audioFile);

  $("#submit").prop("disabled", false);
  document.getElementById("alert").style.display = "block";
});

// Give event listener to the submit button
$("#submit").on("click", function (event) {
  event.preventDefault();
  let btn = $(this);
  //   change the button text and disable it
  btn.html("Submitting...").prop("disabled", true).addClass("disable-btn");
  //   create a new File with the recordedData and its name
  // const recordedFile = new File([player.recordedData], `audiorecord.wav`);
  // //   grabs the value of the language field
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const native_state = document.getElementById("native_state").value;
  const Mother_Tongue = document.getElementById("Mother_Tongue").value;
  const Proficiency = document.getElementById("Proficiency").value;
  const recordedFile = new File([player.recordedData], `${name}_${gender}_${age}_${native_state}_${Mother_Tongue}.wav`); 
  const sentence_no = document.getElementById("sentence_no").value; 
  // const recordedText = new Blob(["Welcome to Websparrow.org."],{ type: "text/plain;charset=utf-8" });
  const recordedText = document.getElementById("sample_text").value;
  console.log(sentence_no);
  // console.log(recordedFile);
  //   initializes an empty FormData
  let data = new FormData();
  //   appends the recorded file and language value
  data.append("recorded_audio", recordedFile);
  data.append("recorded_text", recordedText);
  data.append("name", name);
  data.append("age", age);
  data.append("gender", gender);
  data.append("native_state", native_state);
  data.append("Mother_Tongue", Mother_Tongue);
  data.append("Proficiency", Proficiency );
  data.append("sentence_no", sentence_no );
  //   post url endpoint 
  const url = "";
  $.ajax({
    url: url,
    method: "POST",
    data: data,
    dataType: "json",
    success: function (response) {
      if (response.success) {
        document.getElementById("alert").style.display = "block";
        window.location.href = `${response.url}`;
      } else {
        btn.html("Error").prop("disabled", false);
      }
    },
    error: function (error) {
      console.error(error);
    },
    cache: false,
    processData: false,
    contentType: false,
  });
});
