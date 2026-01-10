---
title: Editorial Board
permalink: /editorial-board/
layout: base.njk
---
{% set years = editorialBoard | keys | sortYearsDesc %}
{% set latestYear = years[0] %}
{% set latestYearRange = latestYear + "-" + (latestYear | int + 1) %}

<script>
  // Redirect to the latest year (dynamically generated)
  window.location.href = '{{ site.baseUrl }}/editorial-board/{{ latestYearRange }}/';
</script>

<p>Redirecting to the latest Editorial Board...</p>

<div id="editorial-content">
  {# Optional: keep JS loading for base page; per-year pages will have server-rendered content #}
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const yearButtons = document.querySelectorAll('.year-button');
    const contentDiv = document.getElementById('editorial-content');
    
    // Base page can still show first year's content for users landing here
    const firstYearButton = yearButtons[0];
    if (firstYearButton && contentDiv) {
      const firstYear = firstYearButton.getAttribute('data-year');
      loadYearContent(firstYear, contentDiv);
    }
    
    yearButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Allow normal navigation to per-year routes
        if (this instanceof HTMLAnchorElement) {
          return; // let the browser navigate
        }
        const year = this.getAttribute('data-year');
        
        // Update active button state
        yearButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Load year content
        loadYearContent(year, contentDiv);
      });
    });
    
    function loadYearContent(year, container) {
      const url = `/eb-years/${year}.html`;
      
      container.innerHTML = '<div class="loading">Loading editorial board...</div>';
      
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load editorial board for ${year}`);
          }
          return response.text();
        })
        .then(html => {
          container.innerHTML = html;
        })
        .catch(error => {
          console.error('Error loading editorial board:', error);
          container.innerHTML = `
            <div class="error-message">
              Sorry, we couldn't load the editorial board for ${year}. Please try again later.
            </div>
          `;
        });
    }
  });
</script>
