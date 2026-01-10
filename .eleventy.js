const fs = require("fs");
const nunjucks = require("nunjucks");

module.exports = function(eleventyConfig) {
  // Add global site configuration (supports BASE_URL env var for GitHub Pages)
  eleventyConfig.addGlobalData("site", {
    baseUrl: process.env.BASE_URL || ""
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
      id
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