// تحميل الصورة وإظهارها
document.getElementById('image-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById('uploaded-image');
      img.src = e.target.result;
      img.style.display = 'block'; // إظهار الصورة
      img.style.transform = 'translate(0, 0) scale(1)'; // إعادة تعيين التحويلات
      img.setAttribute('data-x', 0);
      img.setAttribute('data-y', 0);
      img.setAttribute('data-scale', 1);
      document.getElementById('image-upload').style.display = 'none'; // إخفاء زر التحميل بعد اختيار الصورة
    };
    reader.readAsDataURL(file);
  }
});

// تكبير وتصغير الصورة باستخدام عجلة الماوس
document.getElementById('uploaded-image').addEventListener('wheel', function(event) {
  event.preventDefault();
  const target = event.target;
  let scale = parseFloat(target.getAttribute('data-scale')) || 1;

  // تعديل القيمة بمقدار 0.1 عند تحريك العجلة
  scale += event.deltaY * -0.001;

  // تحديد الحد الأدنى والأقصى للتكبير
  scale = Math.min(Math.max(0.5, scale), 3);

  target.style.transform = `translate(${target.getAttribute('data-x')}px, ${target.getAttribute('data-y')}px) scale(${scale})`;
  target.setAttribute('data-scale', scale);
});

// إعداد النص لإزالة التوجيه المبدئي
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

// تحميل الصورة كـ PNG
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

// إعداد التكبير والتصغير والتحريك باستخدام Interact.js
interact('#uploaded-image')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    onmove: dragMoveListener
  })
  .gesturable({
    onmove: function (event) {
      const target = event.target;
      let scale = (parseFloat(target.getAttribute('data-scale')) || 1) * (1 + event.ds);

      // تحديد الحد الأدنى والأقصى للتكبير
      scale = Math.min(Math.max(0.5, scale), 3);

      target.style.transform = `translate(${target.getAttribute('data-x')}px, ${target.getAttribute('data-y')}px) scale(${scale})`;
      target.setAttribute('data-scale', scale);
    }
  });

function dragMoveListener(event) {
  const target = event.target;
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  target.style.transform = `translate(${x}px, ${y}px) scale(${target.getAttribute('data-scale')})`;

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
