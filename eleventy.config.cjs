module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "src/mock-local": "/" });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      includes: "src/components",
    },
  };
};
