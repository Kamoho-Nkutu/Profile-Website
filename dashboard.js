// Update Profile
document.getElementById('profileForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        bio: document.getElementById('bio').value
    };
    
    try {
        const response = await fetch('update_profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update profile');
    }
});

// Image Upload Handling
document.getElementById('profileImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.querySelector('.user-profile img').src = event.target.result;
        };
        reader.readAsDataURL(file);
        
        // Here you would upload the file to server
    }
});

// In dashboard.js
function saveProfileData(data) {
    localStorage.setItem('portfolioProfile', JSON.stringify(data));
}

function getProfileData() {
    return JSON.parse(localStorage.getItem('portfolioProfile'));
}