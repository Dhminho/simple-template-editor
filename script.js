document.getElementById('image-upload').addEventListener('change', function(event) {
  const reader = new FileReader();
  reader.onload = function() {
    const image = document.getElementById('uploaded-image');
    image.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('download-button').addEventListener('click', function() {
  html2canvas(document.querySelector("#editor")).then(canvas => {
    let link = document.createElement('a');
    link.download = 'template.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
