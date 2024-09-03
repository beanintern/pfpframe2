const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const framedImage = document.getElementById('framed-image');
const downloadBtn = document.getElementById('download-btn');
const borderImage = new Image();
borderImage.src = 'border.png';

let profileImage;

borderImage.onload = () => {
    if (profileImage) {
        combineImages();
    }
};

dropArea.addEventListener('click', () => {
    fileInput.click();
});

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
    const reader = new FileReader();
    reader.onload = (e) => {
        profileImage = new Image();
        profileImage.onload = () => {
            if (borderImage.complete) {
                combineImages();
            }
        };
        profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function combineImages() {
    canvas.width = borderImage.width;
    canvas.height = borderImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(borderImage, 0, 0);
    const profileX = (borderImage.width - profileImage.width) / 2;
    const profileY = (borderImage.height - profileImage.height) / 2;
    ctx.drawImage(profileImage, profileX, profileY);
    framedImage.src = canvas.toDataURL();
    downloadBtn.style.display = 'block';
}

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'framed_profile_picture.png';
    link.href = framedImage.src;
    link.click();
});
