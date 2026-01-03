/* ============================================
   CONTACT FORM - FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  const phoneInput = document.getElementById('phone');
  
  // Phone number auto-formatting for Lebanese numbers (XX XXX XXX)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
      
      // Limit to 8 digits (Lebanese mobile format)
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
      
      // Format: XX XXX XXX
      let formatted = '';
      if (value.length > 0) {
        formatted = value.slice(0, 2);
      }
      if (value.length > 2) {
        formatted += ' ' + value.slice(2, 5);
      }
      if (value.length > 5) {
        formatted += ' ' + value.slice(5, 8);
      }
      
      e.target.value = formatted;
    });
  }
  
  // Set social media links (update with actual URLs)
  const instagramLink = document.getElementById('instagramLink');
  const whatsappLink = document.getElementById('whatsappLink');
  
  // Update these with your actual social media links
  if (instagramLink) {
    instagramLink.href = 'https://instagram.com/your_instagram'; // Replace with actual link
  }
  
  if (whatsappLink) {
    whatsappLink.href = 'https://wa.me/your_whatsapp_number'; // Replace with actual link
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const phoneValue = formData.get('phone') ? '+961 ' + formData.get('phone') : '';
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: phoneValue,
        message: formData.get('message')
      };
      
      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      try {
        // Replace with your actual form submission endpoint
        // For now, this is a placeholder
        await submitContactForm(data);
        
        // Show success message
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        
      } catch (error) {
        // Show error message
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
        formMessage.className = 'form-message error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.className = 'form-message';
        }, 5000);
      }
    });
  }
});

// Submit Contact Form
async function submitContactForm(data) {
  // Replace this with your actual form submission logic
  // Example: Send to email service, API endpoint, etc.
  
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', data);
      // For now, always resolve (replace with actual submission)
      resolve();
      
      // If you have an actual endpoint:
      /*
      fetch('your-endpoint-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
      */
    }, 1000);
  });
}

