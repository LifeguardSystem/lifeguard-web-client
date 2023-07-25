module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "app-vanilla-js": "/app" });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      includes: "src/components",
    },
  };
};
