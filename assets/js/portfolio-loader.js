document.addEventListener('DOMContentLoaded', function() {
  const portfolioContainer = document.querySelector('.isotope-container');

  // Function to create portfolio item HTML
  function createPortfolioItem(item) {
    return `
      <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category.toLowerCase().replace(' ', '-')}">
        <img src="${item.image}" class="img-fluid" alt="${item.title}">
        <div class="portfolio-info">
          <h4>${item.title}</h4>
          <p class="price">${item.price}</p>
          <p class="description">${item.description.substring(0, 100)}...</p>
          <div class="category-badge">${item.category}</div>
        </div>
      </div>
    `;
  }

  // Fetch portfolio items from Netlify CMS
  fetch('/_portfolio/index.json')
    .then(response => response.json())
    .then(items => {
      // Sort items by date, featured items first
      items.sort((a, b) => {
        if (a.featured !== b.featured) return b.featured - a.featured;
        return new Date(b.date) - new Date(a.date);
      });

      // Add items to the container
      items.forEach(item => {
        portfolioContainer.innerHTML += createPortfolioItem(item);
      });

      // Reinitialize Isotope after adding items
      if (window.Isotope) {
        const iso = new Isotope('.isotope-container', {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry'
        });
      }
    })
    .catch(error => console.error('Error loading portfolio items:', error));
});