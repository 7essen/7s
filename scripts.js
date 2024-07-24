function openCategory(category) {
    document.getElementById('categories').style.display = 'none';
    document.getElementById('channels').style.display = 'flex';
    // يمكنك إضافة كود لتحميل القنوات بناءً على الفئة هنا
}

function playStream(streamPath) {
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'flex';
    const videoPlayer = document.getElementById('video-player');
    document.getElementById('video-source').src = streamPath;
    videoPlayer.load();
    videoPlayer.requestFullscreen();
}

function goBack() {
    const liveStreamSection = document.getElementById('live-stream');
    const channelsSection = document.getElementById('channels');
    const newsSection = document.getElementById('news');

    if (liveStreamSection.style.display === 'flex') {
        liveStreamSection.style.display = 'none';
        channelsSection.style.display = 'flex';
    } else if (channelsSection.style.display === 'flex') {
        channelsSection.style.display = 'none';
        document.getElementById('categories').style.display = 'flex';
    } else if (newsSection.style.display === 'flex') {
        newsSection.style.display = 'none';
        document.getElementById('categories').style.display = 'flex';
    }
}

function selectNavIcon(iconId) {
    document.querySelectorAll('.nav-icon').forEach(icon => {
        icon.classList.remove('selected');
    });
    document.getElementById(iconId).classList.add('selected');
}

document.getElementById('home-icon').addEventListener('click', () => {
    selectNavIcon('home-icon');
    document.getElementById('categories').style.display = 'flex';
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'none';
    document.getElementById('news').style.display = 'none';
});

document.getElementById('live-icon').addEventListener('click', () => {
    selectNavIcon('live-icon');
    document.getElementById('categories').style.display = 'none';
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'flex';
    document.getElementById('news').style.display = 'none';
});

document.getElementById('news-icon').addEventListener('click', () => {
    selectNavIcon('news-icon');
    document.getElementById('categories').style.display = 'none';
    document.getElementById('channels').style.display = 'none';
    document.getElementById('live-stream').style.display = 'none';
    document.getElementById('news').style.display = 'flex';
});

// Set initial selection to home-icon
document.addEventListener('DOMContentLoaded', () => {
    selectNavIcon('home-icon');
});
