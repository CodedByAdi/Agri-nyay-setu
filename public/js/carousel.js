// carousel.js
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    // Auto-rotate slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Button event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  });
  
  // Simple translation function
  document.getElementById('translate-btn').addEventListener('click', function() {
    alert('Translation feature would be integrated here with a language selection dropdown');
  });