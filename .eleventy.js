const markdownIt = require("markdown-it");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Set custom directories for input, output, includes, and data
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets/**");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->",
  });

  // add `order` front matter to each pattern to sort them (lower values firts)
  eleventyConfig.addCollection("orderedPatterns", function (collectionApi) {
    return collectionApi.getFilteredByTag("pattern").sort(function (a, b) {
      return a.data.order - b.data.order;
    });
  });

  eleventyConfig.addFilter("md", function (content = "") {
    return markdownIt({ html: true }).render(content);
  });

  eleventyConfig.addFilter("readableDate", function (dateObj) {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", function (dateObj) {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return d.toISOString().slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
