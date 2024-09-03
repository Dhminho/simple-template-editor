document.getElementById('image-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('uploaded-image').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('download-button').addEventListener('click', function() {
  html2canvas(document.querySelector('#editor'), { backgroundColor: null }).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'template.png';
    link.click();
  });
});
