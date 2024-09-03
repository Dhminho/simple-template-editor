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
  }).then
