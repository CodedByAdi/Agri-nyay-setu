// ngo-filter.js
document.addEventListener('DOMContentLoaded', function() {
    // Load NGOs on page load
    fetchNGOs();
    
    // Setup filter event listeners
    document.querySelectorAll('.filter-section input').forEach(checkbox => {
      checkbox.addEventListener('change', fetchNGOs);
    });
    
    function fetchNGOs(page = 1) {
      // Get selected filters
      const selectedTopics = Array.from(
        document.querySelectorAll('.filter-section:first-child input:checked')
      ).map(input => input.value);
      
      const selectedPlaces = Array.from(
        document.querySelectorAll('#places-filter input:checked')
      ).map(input => input.value);
      
      // Create query string
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      if (selectedTopics.length) {
        queryParams.append('topics', selectedTopics.join(','));
      }
      if (selectedPlaces.length) {
        queryParams.append('places', selectedPlaces.join(','));
      }
      
      // Fetch filtered NGOs
      fetch(`/api/ngos?${queryParams.toString()}`)
        .then(response => response.json())
        .then(data => {
          displayNGOs(data.ngos);
          setupPagination(data.totalPages, page);
        })
        .catch(error => {
          console.error('Error fetching NGOs:', error);
          document.getElementById('ngo-list').innerHTML = 
            '<p>Failed to load NGOs. Please try again later.</p>';
        });
    }
    
    function displayNGOs(ngos) {
      const ngoList = document.getElementById('ngo-list');
      ngoList.innerHTML = '';
      
      if (ngos.length === 0) {
        ngoList.innerHTML = '<p>No NGOs found matching your criteria.</p>';
        return;
      }
      
      ngos.forEach(ngo => {
        const ngoCard = document.createElement('div');
        ngoCard.className = 'ngo-card';
        ngoCard.innerHTML = `
          <div class="ngo-info">
            <h3>${ngo.name}</h3>
            <p>${ngo.address}</p>
          </div>
          <div class="ngo-actions">
            <button class="btn btn-primary">Schedule an Appointment</button>
          </div>
        `;
        ngoList.appendChild(ngoCard);
      });
    }
    
    function setupPagination(totalPages, currentPage) {
      // Pagination implementation
    }
  });