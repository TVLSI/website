---
title: Recent Issues
permalink: /recent-issues/
layout: base.njk
---
{% set years = issues | keys | sortYearsDesc %}
{% set latestYear = years[0] %}
{% set latestYearRange = latestYear %}

<script>
  // Redirect to the latest year (dynamically)
  window.location.href = '{{ site.baseUrl }}/recent-issues/{{ latestYearRange }}/';
</script>

<p>Redirecting to the most recent issues...</p>







