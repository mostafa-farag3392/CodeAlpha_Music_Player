document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const progress = document.querySelector('.progress');

    let currentSongIndex = 0;
    let isShuffle = false;
    let isRepeat = false;

    const songs = [
        { title: 'Song 1', src: './audio/audio 1.mpeg' },
        { title: 'Song 2', src: './audio/audio 2.mpeg' },
        { title: 'Song 3', src: './audio/audio 3.mpeg' },
        { title: 'Song 3', src: './audio/audio 4.mpeg' }
    ];

    function loadSong(index) {
        currentSongIndex = index;
        const song = songs[currentSongIndex];
        audioPlayer.src = song.src;
        audioPlayer.play();
    }

    playBtn.addEventListener('click', () => {
        audioPlayer.play();
    });

    pauseBtn.addEventListener('click', () => {
        audioPlayer.pause();
    });

    stopBtn.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });

    prevBtn.addEventListener('click', () => {
        if (currentSongIndex === 0) {
            loadSong(songs.length - 1);
        } else {
            loadSong(currentSongIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSongIndex === songs.length - 1) {
            loadSong(0);
        } else {
            loadSong(currentSongIndex + 1);
        }
    });

    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    });

    repeatBtn.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    });

    audioPlayer.addEventListener('ended', () => {
        if (isRepeat) {
            loadSong(currentSongIndex);
        } else if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            loadSong(randomIndex);
        } else {
            loadSong(currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1);
        }
    });

    // Load first song on page load
    loadSong(currentSongIndex);
});
