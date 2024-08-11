document.addEventListener('DOMContentLoaded', () => {
    fetchChannelCategories(); // جلب الكاتيجوري للقنوات عند تحميل الصفحة
    selectNavIcon('home-icon'); // تحديد الأيقونة الافتراضية

    // Initialize Plyr
    window.player = new Plyr('#player', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        autoplay: false, // يمكن تعيينه إلى true إذا كنت ترغب في تشغيل الفيديو تلقائيًا
    });
});

function fetchChannelCategories() {
    fetch('https://st2-5jox.onrender.com/api/channel-categories?populate=channels')
        .then(response => response.json())
        .then(data => {
            displayChannelCategories(data.data);
            document.getElementById('channels').style.display = 'flex';
            document.getElementById('news').style.display = 'none';
            document.getElementById('matches').style.display = 'none';
        })
        .catch(error => console.error('خطأ في استرجاع القنوات:', error));
}

function displayChannelCategories(categories) {
    const channelsContainer = document.getElementById('channels-container');
    channelsContainer.innerHTML = ''; // مسح المحتوى الحالي
    categories.forEach(category => {
        const categoryBox = document.createElement('div');
        categoryBox.className = 'category-box';
        categoryBox.innerHTML = `<h3>${category.attributes.name}</h3>`;
        categoryBox.onclick = () => displayCategoryChannels(category.attributes.channels.data);
        channelsContainer.appendChild(categoryBox);
    });
}

function displayCategoryChannels(channels) {
    const channelsContainer = document.getElementById('channels-container');
    channelsContainer.innerHTML = ''; // مسح المحتوى الحالي
    channels.forEach(channel => {
        const channelBox = document.createElement('div');
        channelBox.className = 'category-box';
        channelBox.innerHTML = `
            <div>${channel.attributes.name}</div>
        `;
        channelBox.onclick = () => {
            openVideo(channel.attributes.streamLink); // فتح رابط القناة في المشغل
        };
        channelsContainer.appendChild(channelBox);
    });
}

function fetchNews() {
    fetch('https://st2-5jox.onrender.com/api/news?populate=*')
        .then(response => response.json())
        .then(data => {
            displayNews(data.data);
            document.getElementById('news').style.display = 'flex';
            document.getElementById('channels').style.display = 'none';
            document.getElementById('matches').style.display = 'none';
        })
        .catch(error => console.error('خطأ في استرجاع الأخبار:', error));
}

function displayNews(news) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // مسح المحتوى الحالي
    news.forEach(article => {
        const newsBox = document.createElement('div');
        newsBox.className = 'news-box';
        newsBox.onclick = () => {
            window.open(article.attributes.link, '_blank'); // فتح رابط الخبر في نافذة جديدة
        };
        newsBox.innerHTML = `
            <h3>${article.attributes.title}</h3>
            <img src="${article.attributes.image.data.attributes.url}" alt="${article.attributes.title}" />
            <p>${article.attributes.content}</p>
            <p><strong>تاريخ النشر:</strong> ${new Date(article.attributes.date).toLocaleDateString()}</p>
        `;
        newsContainer.appendChild(newsBox);
    });
}

function fetchMatches() {
    fetch('https://st2-5jox.onrender.com/api/matches?populate=*')
        .then(response => response.json())
        .then(data => {
            displayMatches(data.data);
            document.getElementById('matches').style.display = 'flex';
            document.getElementById('channels').style.display = 'none';
            document.getElementById('news').style.display = 'none';
        })
        .catch(error => console.error('خطأ في استرجاع المباريات:', error));
}

function displayMatches(matches) {
    const matchesContainer = document.getElementById('matches-container');
    matchesContainer.innerHTML = ''; // مسح المحتوى الحالي
    matches.forEach(match => {
        const matchBox = document.createElement('div');
        matchBox.className = 'match-box';
        matchBox.innerHTML = `
            <div class="team">
                <img src="${match.attributes.logoA.data.attributes.url}" alt="${match.attributes.teamA}" />
                ${match.attributes.teamA} vs 
                <img src="${match.attributes.logoB.data.attributes.url}" alt="${match.attributes.teamB}" />
                ${match.attributes.teamB}
            </div>
            <time>${match.attributes.matchTime}</time>
            <div><strong>اسم المعلق:</strong> ${match.attributes.commentator}</div>
            <div><strong>اسم القناة:</strong> ${match.attributes.channel}</div>
        `;
        matchBox.onclick = () => {
            openVideo(match.attributes.streamLink); // فتح رابط البث في المشغل
        };
        matchesContainer.appendChild(matchBox);
    });
}

function openVideo(url) {
    const videoOverlay = document.getElementById('video-overlay');
    videoOverlay.style.display = 'block';
    
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(player.media);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            if (player.media.paused) {
                player.play();
            }
        });
    } else if (player.media.canPlayType('application/vnd.apple.mpegurl')) {
        player.media.src = url;
        player.media.addEventListener('loadedmetadata', function() {
            if (player.media.paused) {
                player.play();
            }
        });
    }

    // Request fullscreen mode
    player.fullscreen.request();
}

function closeVideo() {
    const videoOverlay = document.getElementById('video-overlay');
    videoOverlay.style.display = 'none';
    player.pause(); // إيقاف الفيديو عند إغلاق المشغل
}

function selectNavIcon(iconId) {
    // Remove 'selected' class from all icons
    document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('selected'));
    // Add 'selected' class to the clicked icon
    document.getElementById(iconId).classList.add('selected');
}
