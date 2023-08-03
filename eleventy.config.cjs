module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.delete("README.md");

  eleventyConfig.addPassthroughCopy({ public: "/" });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      includes: "src/components",
    },
  };
};
