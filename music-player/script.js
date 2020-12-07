const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    },
]
//Check Song Playing
let isPlaying = false;
let songIndex = 0;

//Play Song
function playSong () {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause Song
function pauseSong () {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`; 
    image.src = `img/${song.name}.jpg`;
}

//Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Update Progress Bar
function updateProgressBar (e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //console.log(duration, currentTime);
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //display duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //display currentTime 
        const currentTimeMinutes = Math.floor(currentTime/60);
        let currentTimeSeconds = Math.floor(currentTime%60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        if (currentTimeSeconds) {
            currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }
    }
}

//Set Progress Bar
function setProgressBar(e) {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX/width)*duration;
}

//Event Listeners 
//for Play/Pause Song
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
//for Prev/Next Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
//for update Progress Bar
music.addEventListener('timeupdate',updateProgressBar);
//for Set Progress Bar
progressContainer.addEventListener('click',setProgressBar);
//for playing next song whencurrent song ends
music.addEventListener('ended',nextSong);

//On-Load - Select First Song
loadSong(songs[songIndex]);