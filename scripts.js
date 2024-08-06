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
            window.open(channel.attributes.streamLink, '_blank'); // فتح رابط القناة في نافذة جديدة
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
        matchBox.onclick = () => {
            window.open(match.attributes.streamLink, '_blank'); // فتح رابط البث في نافذة جديدة
        };
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
        matchesContainer.appendChild(matchBox);
    });
}

function goBack() {
    const sections = ['channels', 'news', 'matches'];
    sections.forEach(section => {
        document.getElementById(section).style.display = 'none';
    });
    document.getElementById('channels').style.display = 'flex'; // عرض قسم القنوات كقسم افتراضي
}

function selectNavIcon(iconId) {
    document.querySelectorAll('.nav-icon').forEach(icon => {
        icon.classList.remove('selected');
    });
    document.getElementById(iconId).classList.add('selected');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchChannelCategories(); // جلب الكاتيجوري للقنوات عند تحميل الصفحة
    selectNavIcon('home-icon'); // تحديد الأيقونة الافتراضية
});
