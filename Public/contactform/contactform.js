document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const formData = new URLSearchParams(new FormData(form)).toString(); // Convert FormData to URL-encoded string

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // Explicitly set Content-Type
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      document.getElementById('sendmessage').style.display = 'block';
      document.getElementById('errormessage').style.display = 'none';
      form.reset(); // Clear the form
    } else {
      document.getElementById('sendmessage').style.display = 'none';
      document.getElementById('errormessage').style.display = 'block';
    }
  }).catch(error => {
    document.getElementById('sendmessage').style.display = 'none';
    document.getElementById('errormessage').style.display = 'block';
    console.error('Error:', error); // Log the error to the console for debugging
  });
});
