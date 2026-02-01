---
title: Scope and Call for Papers
permalink: /
layout: base.njk
---

<div class="content-wrapper">
  <div class="main-content">
    <h1>Scope and Call for Papers</h1>

    <p>The IEEE Transactions on VLSI Systems is published as a monthly journal under the co-sponsorship of the IEEE Circuits and Systems Society, the IEEE Computer Society, and the IEEE Solid-State Circuits Society.</p>

    <p>Design and realization of microelectronic systems using VLSI/ULSI technologies require close collaboration among scientists and engineers in the fields of systems architecture, logic and circuit design, chips and wafer fabrication, packaging, testing and systems applications. Generation of specifications, design and verification must be performed at all abstraction levels, including the system, register-transfer, logic, circuit, transistor and process levels.</p>

    <p>To address this critical area through a common forum, the IEEE Transactions on VLSI Systems have been founded. The editorial board, consisting of international experts, invites original papers which emphasize and merit the novel systems integration aspects of microelectronic systems including interactions among systems design and partitioning, logic and memory design, digital and analog circuit design, layout synthesis, CAD tools, chips and wafer fabrication, testing and packaging, and systems level qualification. Thus, the coverage of these Transactions will focus on VLSI/ULSI microelectronic systems integration.</p>

    <p>Submissions relating to analog and mixed-signal circuits and architectures must be consistent with the emphasis area of the Transactions, namely VLSI/ULSI technologies and implementations. While it is not essential to demonstrate large scale integration in the submission, the eventual applicability of the material to VLSI/ULSI systems should be clear, and when possible, highlighted by the authors. Publications demonstrating measurements and experimental verification of designs are encouraged.</p>
  
      <a href="{{ site.baseUrl }}/author-information/">Information for Authors (Author Guidelines)</a>
  </div>

  <div class="sidebar">
    <h2>Recent Issues</h2>

    {# 
      Create a single list of all issues, sorted chronologically (most recent first).
      1. Get years and sort them descending.
      2. For each year, get its issues and sort them by month descending.
      3. Concatenate these sorted issues into a single list.
    #}
    {% set allIssuesList = [] %}
    {% set sortedYears = issues | keys | sortYearsDesc %}
    {% for yearKey in sortedYears %}
      {% set yearIssuesSorted = issues[yearKey] | sort(false, false, "numerical_month") | reverse %}
      {% for issueItem in yearIssuesSorted %}
        {# Appending to a list in Nunjucks. Ensure your Nunjucks version supports this well. #}
        {% set allIssuesList = allIssuesList.concat([issueItem]) %}
      {% endfor %}
    {% endfor %}

    {% if allIssuesList | length > 0 %}
      {% set latestIssue = allIssuesList[0] %}
      <div class="issue-container">
        <a href="http://ieeexplore.ieee.org/xpl/tocresult.jsp?isnumber={{ latestIssue.isnumber }}" class="issue-link" target="_blank" rel="noopener noreferrer">
          <div class="issue-box">
            <div class="issue-cover">
              <img src="/images/sample.jpg" alt="Cover for Vol. {{ latestIssue.volume }} Issue {{ latestIssue.issue }}" class="issue-image">
              {% if latestIssue.is_new %}
                <img src="/images/new.gif" alt="New!" class="new-badge">
              {% endif %}
              <div class="issue-overlay">
                <span class="issue-volume">Vol. {{ latestIssue.volume }}</span>
                <span class="issue-number">Issue {{ latestIssue.issue }}</span>
              </div>
            </div>
            <span class="issue-text">{{ latestIssue.month }} {{ latestIssue.year }} <span class="fa fa-external-link" aria-hidden="true"></span></span>
          </div>
        </a>
      </div>
    {% endif %}

    {% if allIssuesList | length > 1 %}
      {% set previousIssue = allIssuesList[1] %}
      <div class="issue-container">
        <a href="http://ieeexplore.ieee.org/xpl/tocresult.jsp?isnumber={{ previousIssue.isnumber }}" class="issue-link" target="_blank" rel="noopener noreferrer">
          <div class="issue-box">
            <div class="issue-cover">
              <img src="/images/sample.jpg" alt="Cover for Vol. {{ previousIssue.volume }} Issue {{ previousIssue.issue }}" class="issue-image">
              {% if previousIssue.is_new %}
                <img src="/images/new.gif" alt="New!" class="new-badge">
              {% endif %}
              <div class="issue-overlay">
                <span class="issue-volume">Vol. {{ previousIssue.volume }}</span>
                <span class="issue-number">Issue {{ previousIssue.issue }}</span>
              </div>
            </div>
            <span class="issue-text">{{ previousIssue.month }} {{ previousIssue.year }} <span class="fa fa-external-link" aria-hidden="true"></span></span>
          </div>
        </a>
      </div>
    {% endif %}
  </div>
</div>

<style>
  .issue-image-container {
    position: relative;
    display: flex;
    justify-content: center;
  }
  
  .issue-image {
    width: 111.33px;
    position: relative;
  }
  
  .issue-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    pointer-events: none;
  }
  
  .issue-volume {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .issue-number {
    font-size: 14px;
  }
  
  .new-badge {
    position: absolute;
    top: 5px;
    right: calc(50% - 55.665px + 5px);  /* Center offset + half image width - badge padding */
    width: 35px;
    height: auto;
    z-index: 2;
    pointer-events: none;
  }

  /* Styles for sidebar issues in index.md */
  /* .issue-container is styled in site.css (text-align: center) */

  .sidebar .issue-box {
    display: inline-block; /* Allows centering via text-align on parent */
    width: 111.33px;    /* Maintain specific width of original image */
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    text-align: left;     /* Reset text-align for box contents */
    background-color: #fff;
  }

  .sidebar .issue-cover {
    position: relative;
    padding-top: 140%; /* 7:10 aspect ratio (e.g., 155.86px height for 111.33px width) */
    background-color: #f8f8f8; /* Fallback background for image area */
    border-bottom: 1px solid #e0e0e0; /* Separator line */
  }

  .sidebar .issue-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none; /* Remove default image border if any */
  }

  .sidebar .issue-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    pointer-events: none;
  }

  .sidebar .issue-volume {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .sidebar .issue-number {
    font-size: 14px;
  }

  /* .issue-text is styled by site.css (display:block, font-weight:bold, margin-top:5px) */
  /* Add padding and color to match recent.md style more closely */
  .sidebar .issue-text {
    padding: 8px; 
    text-align: center; /* Ensure text itself is centered */
    color: #333;       /* Match text color from recent.md */
    /* site.css provides: display: block !important; font-weight: bold !important; margin-top: 5px !important; */
  }

  .sidebar .new-badge {
    position: absolute;
    top: 5px;    /* Adjust as needed */
    right: 5px;   /* Adjust as needed */
    width: 35px;
    height: auto;
    z-index: 2;
    pointer-events: none;
  }

  /* Styles for sidebar issues in index.md */
  /* Ensure these selectors are specific enough to override site.css */

  #content .sidebar h2 {
    text-align: center;
    /* Inherits other h2 styles from site.css */
  }

  /* .issue-container is styled in site.css for text-align: center */

  #content .sidebar .issue-box {
    display: inline-block; /* Allows centering via text-align on parent .issue-container */
    width: 160px;          /* Increased width for sidebar issues */
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    text-align: left;     /* Reset text-align for box contents */
    background-color: #fff;
    margin-bottom: 15px; /* Add some spacing between the two issue boxes */
  }

  #content .sidebar .issue-cover {
    position: relative;
    padding-top: 140%; /* 7:10 aspect ratio */
    background-color: #f8f8f8;
    border-bottom: none; /* Remove separator line */
  }

  #content .sidebar .issue-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none !important; /* Override site.css !important */
    margin: 0 !important;    /* Override site.css !important */
    display: block; /* Ensure it behaves as a block for positioning */
  }

  #content .sidebar .issue-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    pointer-events: none;
  }

  #content .sidebar .issue-volume {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  #content .sidebar .issue-number {
    font-size: 14px;
  }

  #content .sidebar .issue-text {
    padding: 8px; 
    text-align: center;
    color: #333;
    margin-top: 0 !important; /* Override site.css margin */
    /* site.css provides: display: block !important; font-weight: bold !important; margin-top: 5px !important; */
    /* These properties from site.css are fine, we are just adding padding and color. */
  }

  #content .sidebar .new-badge {
    position: absolute;
    top: 5px;
    right: 5px; 
    width: 35px;
    height: auto;
    z-index: 2;
    pointer-events: none;
  }
</style>







