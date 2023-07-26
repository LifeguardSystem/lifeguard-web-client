module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      includes: "src/components",
    },
  };
};
