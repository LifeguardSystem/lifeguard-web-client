module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });

  return {
    htmlTemplateEngine: "njk",
  };
};
