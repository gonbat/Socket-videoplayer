let socket = io.connect("http://localhost:3000");

let buttons = document.getElementsByTagName("button");
let playButton = buttons[0];
let pauseButton = buttons[1];

let slider = document.getElementById("slider");

playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "80%",
    width: "80%",
    videoId: "wcV4wjHEO0w",
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: "wcV4wjHEO0w",
      rel: 0,
      modestbranding: 1,
      controls: 0,
      disablekb: 1,
      showInfo: 1,
    },
  });
}

function playVideo() {
  socket.emit("play");
  player.playVideo();
  setInterval(() => {
    let fraction = (player.getCurrentTime() / player.getDuration()) * 100;
    slider.value = fraction;
    socket.emit("slider", slider.value);
  }, 200);
}

function pauseVideo() {
  socket.emit("pause");
  player.pauseVideo();
}

function changeTime(e) {
  let goTo = player.getDuration() * (e.value / 100);

  player.seekTo(goTo, true);
  e.value = goTo;
  socket.emit("update", goTo);
}

socket.on("update", data => {
  console.log("Recieved data", data);
  slider.value = data;
  player.seekTo(data, true);
});

socket.on("play", () => {
  player.playVideo();
});

socket.on("pause", () => {
  player.pauseVideo();
});

socket.on("slider", data => {
  slider.value = data;
});
