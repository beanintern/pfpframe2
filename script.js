const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const framedImage = document.getElementById('framed-image');
const downloadBtn = document.getElementById('download-btn');
const borderImage = new Image();
borderImage.src = 'border.png';

let profileImage;

borderImage.onload = () => {
    console.log('Border image loaded successfully');
    console.log('Border image dimensions:', borderImage.width, 'x', borderImage.height);
    if (profileImage) {
        combineImages();
    }
};

borderImage.onerror = () => {
    console.error('Failed to load border image');
};

// ... rest of the code remains the same ...

function combineImages() {
    console.log('Combining images');
    canvas.width = borderImage.width;
    canvas.height = borderImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(borderImage, 0, 0);
    console.log('Border image drawn on canvas');
    const profileX = (borderImage.width - profileImage.width) / 2;
    const profileY = (borderImage.height - profileImage.height) / 2;
    ctx.drawImage(profileImage, profileX, profileY);
    console.log('Profile image drawn on canvas');
    framedImage.src = canvas.toDataURL();
    downloadBtn.style.display = 'block';
}

// ... rest of the code remains the same ...
