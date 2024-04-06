module.exports = function (eleventyConfig) {
  // Set custom directories for input, output, includes, and data
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets/*");
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

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
