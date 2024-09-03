// ... previous code remains the same ...

function combineImages() {
    console.log('Combining images');
    
    // Set canvas size to match the border image
    canvas.width = borderImage.width;
    canvas.height = borderImage.height;
    console.log('Canvas dimensions set to:', canvas.width, 'x', canvas.height);

    const ctx = canvas.getContext('2d');

    // Draw border image
    ctx.drawImage(borderImage, 0, 0);
    console.log('Border image drawn on canvas');

    // Calculate scaling factor to fit profile image inside border
    const scale = Math.min(
        (borderImage.width * 0.8) / profileImage.width,
        (borderImage.height * 0.8) / profileImage.height
    );
    
    // Calculate position to center the scaled profile image
    const scaledWidth = profileImage.width * scale;
    const scaledHeight = profileImage.height * scale;
    const profileX = (borderImage.width - scaledWidth) / 2;
    const profileY = (borderImage.height - scaledHeight) / 2;

    console.log('Profile image scale:', scale);
    console.log('Scaled profile dimensions:', scaledWidth, 'x', scaledHeight);
    console.log('Profile image position:', profileX, profileY);

    // Draw scaled profile image
    ctx.drawImage(profileImage, profileX, profileY, scaledWidth, scaledHeight);
    console.log('Profile image drawn on canvas');

    // Set the framed image source
    framedImage.src = canvas.toDataURL();
    console.log('Canvas converted to data URL');

    // Make sure the framed image is visible
    framedImage.style.display = 'block';
    
    // Show download button
    downloadBtn.style.display = 'inline-block';
}

// ... rest of the code remains the same ...
