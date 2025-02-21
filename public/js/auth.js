document.addEventListener('DOMContentLoaded', function() {
    // Tab switching logic
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show appropriate content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Form submission
    document.getElementById('farmer-login').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('farmer-email').value;
      const password = document.getElementById('farmer-password').value;
      
      // Simple form validation
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Send login request to server
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType: 'farmer' }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          // Store token in localStorage
          localStorage.setItem('token', data.token);
          window.location.href = '/index.html';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
      });
    });
    
    // Similar event listeners for other forms
  });