const textAreas = document.getElementsByTagName('textarea');

function resizeTextarea(textarea) {
    // console.log('Resizing textarea...');
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
    // console.log('Textarea height set to:', textarea.style.height);
}

Array.from(textAreas).forEach(textarea => {
    resizeTextarea(textarea);
    textarea.addEventListener('input', function() {
        resizeTextarea(this);
    });
});
