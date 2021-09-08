// module.exports = {
//   dir: {
//     input: "html",
//     output: "dist"
//   }
// };
module.exports = (function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/scripts");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");

    return {

        dir: {
            input: "src",
            output: "dist"
        },

    };

});
