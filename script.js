console.log('Script execution started');

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const framedImage = document.getElementById('framed-image');
const downloadBtn = document.getElementById('download-btn');
const borderImage = new Image();

console.log('Attempting to load border image');
borderImage.src = 'border.png';

borderImage.onload = () => {
    console.log('Border image loaded successfully');
    console.log('Border image dimensions:', borderImage.width, 'x', borderImage.height);
    canvas.width = borderImage.width;
    canvas.height = borderImage.height;
};

borderImage.onerror = (e) => {
    console.error('Failed to load border image', e);
};

let profileImage;

dropArea.addEventListener('click', () => fileInput.click());

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = '#eee';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.backgroundColor = 'white';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = 'white';
    const file = e.dataTransfer.files[0];
    processProfileImage(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    processProfileImage(file);
});

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
    
    if (!borderImage.complete || !profileImage.complete) {
        console.log('Images not fully loaded yet. Border loaded:', borderImage.complete, 'Profile loaded:', profileImage.complete);
        return;
    }
    
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

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'framed_profile_picture.png';
    link.href = framedImage.src;
    link.click();
});

console.log('Script execution completed');
