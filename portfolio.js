// In portfolio.js
document.addEventListener('DOMContentLoaded', function() {
    // For Local Storage solution:
    const profileData = JSON.parse(localStorage.getItem('portfolioProfile'));
    
    // For API solution:
    // fetch('/api/profile')
    //     .then(response => response.json())
    //     .then(profileData => {
            if (profileData) {
                document.getElementById('profile-name').textContent = profileData.name;
                document.getElementById('profile-bio').textContent = profileData.bio;
                
                // Update social links
                const socialContainer = document.querySelector('.social');
                socialContainer.innerHTML = '';
                
                if (profileData.socialLinks) {
                    Object.entries(profileData.socialLinks).forEach(([platform, url]) => {
                        if (url) {
                            const iconClass = `fa-brands fa-${platform.toLowerCase()}`;
                            socialContainer.innerHTML += `
                                <a href="${url}" target="_blank"><i class="${iconClass}"></i></a>
                            `;
                        }
                    });
                }
            }
    //     });
});