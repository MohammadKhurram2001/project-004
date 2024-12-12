import { setupPasswordToggle } from './passwordToggle.js';
import { setupFormValidation } from './formValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggle();
  setupFormValidation();
});

export function setupPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
  
    if (!passwordInput || !toggleButton) return;
  
    toggleButton.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
  
      const icon = toggleButton.querySelector('i');
      icon.classList.toggle('bi-eye');
      icon.classList.toggle('bi-eye-slash');
    });
  }

  export function setupFormValidation() {
    const form = document.getElementById('signUpForm');
    if (!form) return;
  
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  
    const validatePhone = (phone) => {
      if (!phone) return true; // Optional field
      return /^\+?[\d\s-]{10,}$/.test(phone);
    };
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const formData = new FormData(form);
      let isValid = true;
  
      // Validate required fields
      ['fullName', 'email', 'stateCountry', 'industry', 'password'].forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        }
      });
  
      // Email validation
      const emailInput = document.getElementById('email');
      if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      }
  
      // Phone validation (optional)
      const phoneInput = document.getElementById('phone');
      if (phoneInput.value && !validatePhone(phoneInput.value)) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
      }
  
      // Terms checkbox validation
      const termsCheck = document.getElementById('termsCheck');
      if (!termsCheck.checked) {
        termsCheck.classList.add('is-invalid');
        isValid = false;
      }
  
      if (isValid) {
        // Here you would typically submit the form data to your server
        console.log('Form submitted successfully');
      }
    });
  
    // Clear validation on input
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
      });
    });
  }