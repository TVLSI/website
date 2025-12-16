---
title: Top 25 Downloaded Manuscripts By Year
permalink: /top-downloads/
layout: base.njk
---
{% set years = downloads | keys | sortYearsDesc %}
{% set latestYear = years[0] %}

<script>
  // Redirect to the latest year (dynamically)
  window.location.href = '/top-downloads/{{ latestYear }}/';
</script>

<p>Redirecting to the latest Top 25 downloads...</p>
