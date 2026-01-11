const fs = require("fs");
const nunjucks = require("nunjucks");

module.exports = function(eleventyConfig) {
  // Preview mode configuration (set via environment variables)
  const isPreviewMode = process.env.PREVIEW_MODE === "true";
  const previewInfo = {
    branch: process.env.PREVIEW_BRANCH || "unknown",
    pr: process.env.PREVIEW_PR || "?",
    sha: process.env.PREVIEW_SHA || "unknown",
    time: process.env.PREVIEW_TIME || new Date().toISOString()
  };

  // Add global site configuration (supports BASE_URL env var for GitHub Pages)
  eleventyConfig.addGlobalData("site", {
    baseUrl: process.env.BASE_URL || "",
    isPreview: isPreviewMode,
    preview: previewInfo
  });

  // Properly map assets to their correct destination folders
  eleventyConfig.addPassthroughCopy({ "assets/images": "images" });
  eleventyConfig.addPassthroughCopy({ "assets/pdfs": "pdfs" });

  // Passthrough copy for src js and css files
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  // Replace the existing keys filter with this safer version
  eleventyConfig.addFilter("keys", function(obj) {
    if (!obj || typeof obj !== 'object') {
      return [];
    }
    return Object.keys(obj);
  });
  
  // Add filter to sort years in descending order - needed for year navigation
  eleventyConfig.addFilter("sortYearsDesc", function(years) {
    return years.sort((a, b) => b - a);
  });

  eleventyConfig.addFilter("prettyDump", function(obj) {
    return JSON.stringify(obj, null, 2); // 2-space indent
  });

  // Add filter to convert to integer
  eleventyConfig.addFilter("int", function(str) {
    return parseInt(str);
  });

  // Add filter to reverse array (if you don't want to use sortYearsDesc)
  eleventyConfig.addFilter("reverse", function(arr) {
    return [...arr].reverse();
  });

  // Add this filter after your existing filters
  eleventyConfig.addFilter("typeof", function(obj) {
    return typeof obj;
  });

  // Add url filter for resolving paths with baseUrl
  eleventyConfig.addFilter("url", function(path) {
    const baseUrl = process.env.BASE_URL || "";
    // If path already starts with http:// or https://, return as-is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Prepend baseUrl to absolute paths
    if (path && path.startsWith('/')) {
      return baseUrl + path;
    }
    return path;
  });

  // Transform to fix absolute paths in HTML output for GitHub Pages
  eleventyConfig.addTransform("baseUrlTransform", function(content, outputPath) {
    const baseUrl = process.env.BASE_URL || "";
    // Only process HTML files and only if baseUrl is set
    if (baseUrl && outputPath && outputPath.endsWith(".html")) {
      // Fix href="/path" patterns, but NOT if already prefixed with baseUrl
      // Using negative lookahead to avoid matching paths that already start with baseUrl
      const baseUrlEscaped = baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const hrefRegex = new RegExp(`href="/((?!${baseUrlEscaped.slice(1)})[^"]*)"`, 'g');
      const srcRegex = new RegExp(`src="/((?!${baseUrlEscaped.slice(1)})[^"]*)"`, 'g');
      content = content.replace(hrefRegex, `href="${baseUrl}/$1"`);
      content = content.replace(srcRegex, `src="${baseUrl}/$1"`);
    }
    return content;
  });

  // Transform to inject preview banner for preview deployments
  eleventyConfig.addTransform("previewBanner", function(content, outputPath) {
    // Only inject if in preview mode and processing HTML files
    if (!isPreviewMode || !outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    // Create a minimal, non-intrusive banner
    const bannerHtml = `
<!-- PREVIEW BANNER - Injected by Eleventy -->
<style>
  #preview-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 12px;
    padding: 4px 12px;
    z-index: 99999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  #preview-banner strong { font-weight: 600; }
  #preview-banner code {
    background: rgba(255,255,255,0.2);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 11px;
  }
  #preview-banner .preview-left { display: flex; gap: 12px; align-items: center; }
  #preview-banner .preview-dismiss {
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    padding: 2px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 11px;
  }
  #preview-banner .preview-dismiss:hover { background: rgba(255,255,255,0.3); }
  body { padding-top: 28px !important; }
</style>
<div id="preview-banner">
  <div class="preview-left">
    <strong>⚠️ DEVELOPER PREVIEW</strong>
    <span>Branch: <code>${previewInfo.branch}</code></span>
    <span>PR: <code>#${previewInfo.pr}</code></span>
    <span>SHA: <code>${previewInfo.sha.substring(0, 7)}</code></span>
    <span>Built: <code>${previewInfo.time}</code></span>
  </div>
  <button class="preview-dismiss" onclick="document.getElementById('preview-banner').style.display='none';document.body.style.paddingTop='0';">×</button>
</div>
<!-- END PREVIEW BANNER -->
`;

    // Inject banner right after <body> tag
    if (content.includes('<body')) {
      // Find the closing > of the body tag (handles <body> and <body class="...">)
      content = content.replace(/(<body[^>]*>)/i, `$1${bannerHtml}`);
    }

    return content;
  });

  eleventyConfig.addShortcode("personTile", function(title, person, id) {
    const templatepath = "src/_includes/components/person-tile.njk";
    const template = fs.readFileSync(templatepath, "utf8");
    const env = new nunjucks.Environment();

    // Add the prettyDump filter to the Nunjucks environment
    env.addFilter("prettyDump", function(obj) {
      return JSON.stringify(obj, null, 2); // 2-space indent
    });
    
    return env.renderString(template, {
      title,
      person,
      id,
      site: { baseUrl: process.env.BASE_URL || "" }
    });
  });

  // Shortcode for rendering issue-year.njk with parameters
  eleventyConfig.addShortcode("renderIssueYearFragment", function(year, issuesForYear) {
    // 'this.env' should be Eleventy's configured Nunjucks environment when
    // this shortcode is used within a Nunjucks template.
    if (this.env && typeof this.env.render === 'function') {
      try {
        // The path to the template for this.env.render() is relative to your Nunjucks configured paths.
        // Given your config (input: "src", includes: "_includes"),
        // "components/issue-year.njk" should resolve if the file is at
        // "src/_includes/components/issue-year.njk".
        return this.env.render("components/issue-year.njk", { year: year, issues: issuesForYear });
      } catch (e) {
        console.error(`[renderIssueYearFragment] Error rendering via this.env.render for year ${year}:`, e);
        return `<p class="error-message">Error pre-rendering issues for ${year}. Details in console.</p>`;
      }
    } else {
      // Fallback if this.env is not available or not as expected.
      // This might happen if the shortcode is used outside a Nunjucks rendering context
      // or if 'this' binding is unexpected.
      console.warn("[renderIssueYearFragment] Nunjucks environment (this.env) not available or unusable. Attempting fallback rendering. Pre-rendered content might be incomplete or lack global features.");
      const templateFilePath = "src/_includes/components/issue-year.njk"; // Full path from project root
      try {
        const templateString = fs.readFileSync(templateFilePath, "utf8");
        // Create a basic, isolated Nunjucks environment with a loader for src/_includes
        const loader = new nunjucks.FileSystemLoader('src/_includes');
        const isolatedEnv = new nunjucks.Environment(loader);
        // If your fragment relies on specific global filters, you might need to add them to isolatedEnv here.
        return isolatedEnv.renderString(templateString, { year: year, issues: issuesForYear });
      } catch (e) {
        console.error(`[renderIssueYearFragment] Error rendering via fallback for year ${year}:`, e);
        return `<p class="error-message">Error pre-rendering issues for ${year} (fallback failed). Details in console.</p>`;
      }
    }
  });

  // Basic server configuration
  eleventyConfig.setServerOptions({
    domdiff: false,
    port: 8080,
    showAllHosts: true
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "../data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};