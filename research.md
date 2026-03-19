---
layout: default
title: Research
nav: research
description: Research publications and working papers by Stella Yeayeun Park.
---

<h1 class="page-title">Research</h1>

<div class="section-heading">Publications</div>

{% for pub in site.data.publications %}
<div class="publication">
  {{ pub.authors }} ({{ pub.year }}), "{{ pub.title }}." <em>{{ pub.journal }}</em>.{% if pub.url %} <a href="{{ pub.url }}" target="_blank">[Link]</a>{% endif %}
</div>
{% endfor %}

<div class="section-heading">Working Papers</div>

<ol class="paper-list">
{% for paper in site.data.working_papers %}
  <li>
    "{{ paper.title }}" {{ paper.coauthors }}
    {% if paper.status %}<span class="status">{{ paper.status }}</span>{% endif %}
  </li>
{% endfor %}
</ol>
