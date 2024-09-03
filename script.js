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

document.getElementById('uploaded-image').addEventListener('click', function() {
  document.getElementById('image-upload').click();
});

document.getElementById('text-rect').addEventListener('focus', function() {
  if (this.innerText === 'أدخل النص هنا') {
    this.innerText = '';
  }
});

document.getElementById('text-rect').addEventListener('blur', function() {
  if (this.innerText === '') {
    this.innerText = 'أدخل النص هنا';
  }
});

document.getElementById('download-button').addEventListener('click', function() {
  const downloadButton = document.getElementById('download-button');
  downloadButton.style.display = 'none'; // إخفاء زر التحميل مؤقتًا

  html2canvas(document.querySelector('#editor'), {
    backgroundColor: null, // تعيين الخلفية كـ null لجعلها شفافة
    useCORS: true // استخدام CORS للسماح بتحميل الصور من مصادر خارجية
  }).then(canvas => {
    downloadButton.style.display = 'block'; // إعادة إظهار زر التحميل

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'template.png';
    link.click();
  });
});

// تفعيل السحب والتكبير والتصغير باستخدام interact.js
interact('#uploaded-image')
  .draggable({
    onmove: function(event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)
