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
  html2canvas(document.querySelector('#editor'), {
    backgroundColor: null, // تعيين الخلفية كـ null لجعلها شفافة
    useCORS: true // استخدام CORS للسماح بتحميل الصور من مصادر خارجية
  }).then(canvas => {
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'template.png';
    link.click();
  });
});
