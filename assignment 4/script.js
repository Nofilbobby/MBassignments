const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const userInfo = document.getElementById('user-info');

searchBtn.addEventListener('click', () => {
    const username = searchInput.value.trim();
    if (username) {
        getUser(username);
    } else {
        userInfo.innerHTML = '<p>Please enter a GitHub username.</p>';
    }
});

async function getUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const userData = await response.json();
        const userHtml = `
            <div>
                <img src="${userData.avatar_url}" alt="${username}" style="border-radius: 50%; width: 100px; height: 100px;">
                <h2>${userData.login} (${userData.name || 'No name'})</h2>
                <p>${userData.bio || 'No bio available'}</p>
                <p>Followers: ${userData.followers}</p>
                <p>Following: ${userData.following}</p>
                <a href="${userData.html_url}" target="_blank">Visit profile</a>
            </div>
        `;
        userInfo.innerHTML = userHtml;
    } catch (error) {
        console.error('Error fetching user data:', error);
        userInfo.innerHTML = '<p>User not found. Please check the username and try again.</p>';
    }
}
