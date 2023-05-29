const pegjs = require("pegjs");
const fs = require("fs");

module.exports = {
  process(sourceText, sourcePath, options) {
    const grammar = fs.readFileSync(sourcePath, { encoding: "utf8" });
    const parserSource = pegjs.generate(grammar, {
      output: "source",
      format: "commonjs",
      allowedStartRules: ["start", "game", "movetext"],
    });
    return { code: parserSource };
  },
};

/*
const fs = require("fs");

module.exports = {
  process(sourceText, sourcePath, options) {
    const fileContents = fs
      .readFileSync(sourcePath, { encoding: "utf8" })
      .toString();
    const json = JSON.stringify(fileContents)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");

    return {
      code: `module.exports = ${json};`,
    };
  },
};
*/
