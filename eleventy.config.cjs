module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "src/app": "/app" });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      includes: "components",
    },
  };
};
