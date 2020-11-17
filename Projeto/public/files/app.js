var firebaseConfig = {
  apiKey: "AIzaSyAfy0Lz3vjVccE3XSBb4rQpI3-1zM2N0SY",
  authDomain: "imagenator-ccdab.firebaseapp.com",
  databaseURL: "https://imagenator-ccdab.firebaseio.com",
  projectId: "imagenator-ccdab",
  storageBucket: "imagenator-ccdab.appspot.com",
  messagingSenderId: "571893378531",
  appId: "1:571893378531:web:4668c69f6606df79f204d6",
  measurementId: "G-LLGZY6SCGE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

function uploadImage() {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#photo").files[0];
  const name = +new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type,
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      console.log(url);
      document.querySelector("#image").src = url;
    })
    .catch(console.error);
}

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector("span#errorMsg");
const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 480,
  },
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
var context = canvas.getContext("2d");
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 640, 480);
  var image = new Image();
  image.id = "pic";
  image.src = canvas.toDataURL();
  console.log(image.src);
  var button = document.createElement("button");
  button.textContent = "Upload";
  button.classList.add("button");
  document.body.appendChild(button);
  button.onclick = function () {
    const ref = firebase.storage().ref();
    ref
      .child(new Date() + "-" + "base64")
      .putString(image.src, "data_url")
      .then(function (snapshot) {        
        alert("Image Uploaded");
      });
  };
});
