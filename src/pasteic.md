---
title: Past EIC's
permalink: /past-eic/
layout: base.njk
---

# Past Editors-in-Chief

<div class="person-grid">
{% for eic in pasteic %}
  {% personTile "Editor-in-Chief " + eic.eic.start + "-" + eic.eic.end, eic, "eic-" + loop.index %}
{% endfor %}
</div>
