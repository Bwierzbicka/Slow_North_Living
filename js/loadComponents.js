fetch('/components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));

fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));

fetch('/components/privacy-banner.html')
  .then(res => res.text())
  .then(data => {
    const container = document.getElementById('privacy-banner');
    container.innerHTML = data;

    const btn = document.getElementById('accept-btn');

    btn.addEventListener('click', () => {
      localStorage.setItem('privacyAccepted', 'true');
      container.style.display = 'none';
    });
  });