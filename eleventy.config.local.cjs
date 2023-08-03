module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.delete("README.md");

  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "src/mock-local": "/" });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      includes: "src/components",
    },
  };
};
