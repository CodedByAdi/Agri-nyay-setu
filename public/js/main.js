<script src="js/translations.js"></script>
// Translation functionality
let currentLang = localStorage.getItem('language') || 'en';

// Set initial language based on stored preference
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  translatePage();
  
  // Add event listener to translate button
  const translateBtn = document.querySelector('.translate-btn'); // Add this class to your TRANSLATE button
  if (translateBtn) {
    translateBtn.addEventListener('click', toggleLanguage);
  }
});

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  localStorage.setItem('language', currentLang);
  document.documentElement.lang = currentLang;
  translatePage();
}

function translatePage() {
  const elements = document.querySelectorAll('[data-translate-key]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate-key');
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });
  
  // Update button text
  const translateBtn = document.querySelector('.translate-btn');
  if (translateBtn) {
    translateBtn.textContent = translations[currentLang]["TRANSLATE"];
  }
}