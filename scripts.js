function openCategory(category) {
    // إخفاء قسم الفئات
    document.getElementById('categories').style.display = 'none';
    
    // عرض قسم القنوات
    document.getElementById('channels').style.display = 'flex';
    
    // تغيير عنوان قسم القنوات بناءً على الفئة المختارة
    const channelsTitle = document.getElementById('channels-title');
    channelsTitle.textContent = category === 'bein-sports-fhd' ? 'BEIN SPORTS FHD' : 
                                category === 'bein-sports-sd' ? 'BEIN SPORTS SD' : 
                                'BEIN SPORTS LOW';
    
    // إضافة القنوات
    const channelsContainer = document.getElementById('channels');
    channelsContainer.innerHTML = '';
    
    if (category === 'bein-sports-fhd') {
        addChannels([
            'BEIN SPORTS 1 FHD', 'BEIN SPORTS 2 FHD', 'BEIN SPORTS 3 FHD', 'BEIN SPORTS 4 FHD',
            'BEIN SPORTS 5 FHD', 'BEIN SPORTS 6 FHD', 'BEIN SPORTS 7 FHD', 'BEIN SPORTS 8 FHD',
            'BEIN SPORTS 9 FHD', 'BEIN SPORTS 10 FHD', 'BEIN SPORTS 11 FHD', 'BEIN SPORTS 12 FHD'
        ]);
    } else if (category === 'bein-sports-sd') {
        addChannels([
            'BEIN SPORTS 1 SD', 'BEIN SPORTS 2 SD', 'BEIN SPORTS 3 SD', 'BEIN SPORTS 4 SD',
            'BEIN SPORTS 5 SD', 'BEIN SPORTS 6 SD', 'BEIN SPORTS 7 SD', 'BEIN SPORTS 8 SD',
            'BEIN SPORTS 9 SD', 'BEIN SPORTS 10 SD', 'BEIN SPORTS 11 SD', 'BEIN SPORTS 12 SD'
        ]);
    } else {
        addChannels([
            'BEIN SPORTS 1 LOW', 'BEIN SPORTS 2 LOW', 'BEIN SPORTS 3 LOW', 'BEIN SPORTS 4 LOW',
            'BEIN SPORTS 5 LOW', 'BEIN SPORTS 6 LOW', 'BEIN SPORTS 7 LOW', 'BEIN SPORTS 8 LOW',
            'BEIN SPORTS 9 LOW', 'BEIN SPORTS 10 LOW', 'BEIN SPORTS 11 LOW', 'BEIN SPORTS 12 LOW'
        ]);
    }
}

function addChannels(channelNames) {
    const channelsContainer = document.getElementById('channels');
    
    channelNames.forEach(channelName => {
        const channelBox = document.createElement('div');
        channelBox.className = 'category-box';
        channelBox.textContent = channelName;
        channelBox.onclick = () => playStream(`path-to-${channelName.toLowerCase().replace(/\s/g, '-')}.mp4`);
        channelsContainer.appendChild(channelBox);
    });
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
