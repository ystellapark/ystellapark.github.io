/* ============================================
   Site Search — Client-side JS search
   ============================================ */

// Searchable content index
var siteIndex = [
  {
    title: "Home",
    url: "index.html",
    content: "Stella Yeayeun Park Assistant Professor Sogang Business School Sogang University Ph.D. Accounting Wharton School University of Pennsylvania Computer Science Economics Swarthmore College Singapore Management University disclosure information processing contracting capital markets real economy data analyst Samuel Zell Robert Lurie Real Estate Center yeayeunpark@sogang.ac.kr Faculty Page Google Scholar LinkedIn GitHub"
  },
  {
    title: "Research",
    url: "research.html",
    content: "Publications Armstrong Glaeser Park Timmermans Assignment of Intellectual Property Rights and Innovation Journal of Accounting Research Working Papers Do Retail Flows Explain the Overnight-Intraday Return Gap Youngkil Ahn Don Noh Alfred Qi Fan Revise Resubmit Journal of Financial and Quantitative Analysis Disclosure and Competition for Limited Investor Resources Catherine Schrand Frank Zhou Chinese Government Financing and Financial Reporting Quality Yanduo Chen Yue Heng Is Disclosure Priced Ex-Ante Jeremy Michels Complex Disclosures and Investor Divergence at Earnings Announcements"
  },
  {
    title: "CV",
    url: "cv.html",
    content: "Stella Yeayeun Park CV Curriculum Vitae Academic Employment Sogang University Assistant Professor Accounting 2025 Singapore Management University 2021 Education Wharton School University of Pennsylvania Ph.D. Accounting Christopher Armstrong Mirko Heinle Robert Holthausen Christopher Ittner Swarthmore College Computer Science Economics Publications Working Papers Professional Activities Invited Conferences Presentations EAA Congress KAA Hawaii Accounting Research Conference University of Melbourne KAIST MIT Asia Conference SOAR Accounting Symposium Tri-Uni Accounting Research Conference Journal of Accounting and Economics Conference Cornell Financial Reporting Teaching Managerial Accounting Statistical Programming EMBA Corporate Valuation Wayne Guay Awards Grants Singapore Ministry of Education MOE Tier 1 Research Grant Wharton School Fellowship Jacobs Levy Equity Management Mack Institute Innovation Research Fellowship Data Analyst Samuel Zell Robert Lurie Real Estate Center PricewaterhouseCoopers Ad Hoc Reviewer European Accounting Association The Accounting Review FARS HARC"
  }
];

// Toggle hamburger nav
function toggleNav() {
  var nav = document.getElementById('siteNav');
  nav.classList.toggle('open');
}

// Close nav when clicking a link (mobile)
document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      document.getElementById('siteNav').classList.remove('open');
    });
  });
});

// Search overlay functions
function openSearch() {
  document.getElementById('searchOverlay').classList.add('active');
  setTimeout(function() {
    document.getElementById('searchInput').focus();
  }, 100);
  // Close hamburger if open
  document.getElementById('siteNav').classList.remove('open');
}

function closeSearch(e) {
  if (e.target === document.getElementById('searchOverlay')) {
    document.getElementById('searchOverlay').classList.remove('active');
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
  }
}

// Close search with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('searchOverlay').classList.remove('active');
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
  }
});

// Perform search
function doSearch(query) {
  var resultsDiv = document.getElementById('searchResults');
  query = query.trim().toLowerCase();

  if (query.length < 2) {
    resultsDiv.innerHTML = '';
    return;
  }

  var results = [];
  siteIndex.forEach(function(page) {
    var contentLower = page.content.toLowerCase();
    var titleLower = page.title.toLowerCase();

    if (contentLower.indexOf(query) !== -1 || titleLower.indexOf(query) !== -1) {
      // Extract a snippet around the match
      var idx = contentLower.indexOf(query);
      var snippet = '';
      if (idx !== -1) {
        var start = Math.max(0, idx - 40);
        var end = Math.min(page.content.length, idx + query.length + 60);
        snippet = (start > 0 ? '...' : '') + page.content.substring(start, end) + (end < page.content.length ? '...' : '');
      }
      results.push({ title: page.title, url: page.url, snippet: snippet });
    }
  });

  if (results.length === 0) {
    resultsDiv.innerHTML = '<div class="no-results">No results found for "' + query + '"</div>';
    return;
  }

  var html = '';
  results.forEach(function(r) {
    html += '<a href="' + r.url + '">';
    html += '<div class="result-title">' + r.title + '</div>';
    if (r.snippet) {
      html += '<div class="result-snippet">' + r.snippet + '</div>';
    }
    html += '</a>';
  });
  resultsDiv.innerHTML = html;
}
