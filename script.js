console.log('Script execution started');

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const framedImage = document.getElementById('framed-image');
const downloadBtn = document.getElementById('download-btn');
const borderImage = new Image();

console.log('Attempting to load border image');
borderImage.src = 'border.png';

borderImage.onload = () => {
    console.log('Border image loaded successfully');
    console.log('Border image dimensions:', borderImage.width, 'x', borderImage.height);
};

borderImage.onerror = (e) => {
    console.error('Failed to load border image', e);
};

let profileImage;

// ... other event listeners remain the same ...

function processProfileImage(file) {
    console.log('Processing profile image');
    const reader = new FileReader();
    reader.onload = (e) => {
        profileImage = new Image();
        profileImage.onload = () => {
            console.log('Profile image loaded successfully');
            console.log('Profile image dimensions:', profileImage.width, 'x', profileImage.height);
            combineImages();
        };
        profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function combineImages() {
    console.log('Combining images');
    
    // Ensure both images are loaded
    if (!borderImage.complete || !profileImage.complete) {
        console.log('Images not fully loaded yet. Border loaded:', borderImage.complete, 'Profile loaded:', profileImage.complete);
        return;
    }
    
    canvas.width = borderImage.width;
    canvas.height = borderImage.height;
    console.log('Canvas dimensions set to:', canvas.width, 'x', canvas.height);
    
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw profile image
    const scale = Math.min(
        (canvas.width * 0.9) / profileImage.width,
        (canvas.height * 0.9) / profileImage.height
    );
    const scaledWidth = profileImage.width * scale;
    const scaledHeight = profileImage.height * scale;
    const profileX = (canvas.width - scaledWidth) / 2;
    const profileY = (canvas.height - scaledHeight) / 2;
    
    ctx.drawImage(profileImage, profileX, profileY, scaledWidth, scaledHeight);
    console.log('Profile image drawn on canvas at:', profileX, profileY, 'with dimensions:', scaledWidth, 'x', scaledHeight);
    
    // Draw border image
    ctx.drawImage(borderImage, 0, 0, canvas.width, canvas.height);
    console.log('Border image drawn on canvas');
    
    // Set the framed image source
    framedImage.src = canvas.toDataURL();
    console.log('Canvas converted to data URL and set as framed image source');
    
    // Show download button
    downloadBtn.classList.add('visible');
}

// ... rest of the code remains the same ...
