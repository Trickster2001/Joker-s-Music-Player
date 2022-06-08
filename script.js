console.log("Joker's Player");
//Initialize the variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myprogressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"))

let songs = [
    { songName: "BellaCiao", filePath: "songs/1.mp3", coverPath: "covers/bg.jpg" },
    { songName: "King-Of-The-World", filePath: "songs/2.mp3", coverPath: "covers/bg.jpg" },
    { songName: "Bula-Dena", filePath: "songs/3.mp3", coverPath: "covers/bg.jpg" },
    { songName: "Tumhari-kasam", filePath: "songs/4.mp3", coverPath: "covers/bg.jpg" },
    { songName: "Play-Date", filePath: "songs/5.mp3", coverPath: "covers/bg.jpg" },
    { songName: "O-Sheth", filePath: "songs/6.mp3", coverPath: "covers/bg.jpg" }
]

songItems.forEach((element, i) => {
    // console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})


// handle play/pause
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener("timeupdate", () => {

    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myprogressBar.value = progress;
})

myprogressBar.addEventListener("change", () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        // element.classList.remove("fa-circle-pause")
        // element.classList.add("fa-circle-play");

    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach(element => {
    element.addEventListener("click", (e) => {
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // e.target.classList.remove("fa-circle-play");
        // e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex + 1}.mp3`
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause")
    })
})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause")
})

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex<=0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause")
})