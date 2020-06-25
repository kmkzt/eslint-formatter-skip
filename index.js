const fs = require("fs");

const logger = (filePath, source, output) => {
  const line = "------------------";
  const Box = (title, info) => {
    console.log(title);
    console.log(line);
    console.log(info);
    console.log(line);
  };

  console.log(filePath);
  console.log(line);
  Box("Source", source);
  Box("Format", output);
};

/**
 * @type {import('eslint').ESLint.Formatter['format']}
 */
module.exports = (results, data) => {
  const overrideList = results.reduce((formatList, result) => {
    const { filePath, source, output, messages } = result;
    const errRules = messages.reduce((list, mes) => (!list.includes(mes.ruleId) ? [...list, mes.ruleId] : list), []);
    if (errRules.length === 0) return formatList;
    const code = source || output;
    const formatCode = `/* eslint-disable ${errRules.join(", ")} */\n${code}`;

    logger(filePath, code, formatCode);
    return {
      ...formatList,
      [filePath]: formatCode,
    };
  }, {});

  Object.keys(overrideList).map((fpath) => {
    fs.writeFile(fpath, overrideList[fpath], (err) => {
      if (err) {
        console.error("Failed override: " + fpath);
        throw err;
      }
      console.log("Success override: " + fpath);
    });
  });

  return JSON.stringify(overrideList, null, 2);
};
