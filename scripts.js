// scripts.js

function openCategory(category) {
    document.getElementById('categories').style.display = 'none';
    document.getElementById('channels').style.display = 'block';
    // هنا يمكن إضافة كود لتحميل القنوات بناءً على الفئة
}

function playStream(streamPath) {
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'block';
    const videoPlayer = document.getElementById('video-player');
    document.getElementById('video-source').src = streamPath;
    videoPlayer.load();
    videoPlayer.requestFullscreen();
}

function goBack() {
    const liveStreamSection = document.getElementById('live-stream');
    const channelsSection = document.getElementById('channels');
    const newsSection = document.getElementById('news');

    if (liveStreamSection.style.display === 'block') {
        liveStreamSection.style.display = 'none';
        channelsSection.style.display = 'block';
    } else if (channelsSection.style.display === 'block') {
        channelsSection.style.display = 'none';
        document.getElementById('categories').style.display = 'block';
    } else if (newsSection.style.display === 'block') {
        newsSection.style.display = 'none';
        document.getElementById('categories').style.display = 'block';
    }
}

function activateNavIcon(iconId) {
    const icons = document.querySelectorAll('.nav-icon');
    icons.forEach(icon => {
        icon.classList.remove('selected');
    });

    document.getElementById(iconId).classList.add('selected');
}

document.getElementById('home-icon').addEventListener('click', () => {
    activateNavIcon('home-icon');
    document.getElementById('categories').style.display = 'block';
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'none';
    document.getElementById('news').style.display = 'none';
});

document.getElementById('live-icon').addEventListener('click', () => {
    activateNavIcon('live-icon');
    document.getElementById('categories').style.display = 'none';
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'block';
    document.getElementById('news').style.display = 'none';
});

document.getElementById('news-icon').addEventListener('click', () => {
    activateNavIcon('news-icon');
    document.getElementById('categories').style.display = 'none';
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'none';
    document.getElementById('news').style.display = 'block';
});
