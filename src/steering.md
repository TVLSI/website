---
title: Steering Committee
permalink: /steering-committee/
layout: base.njk
---

# Steering Committee

## STEERING COMMITTEE CHAIR

<div class="person-grid chair-section">
  {% personTile "Steering Committee Chair", steering.chair, "chair" %}
</div>

## STEERING COMMITTEE MEMBERS

<div class="person-grid">
{% for member in steering.members %}
  {% personTile "Steering Committee", member, "member-" + loop.index %}
{% endfor %}
</div>
