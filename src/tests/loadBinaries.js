const fs = require('fs');
const path = require('path');
const glob = require('glob');

const loadBinaries = (binaryMockDataFolder) => {
  global.mockBinaries = global.mockBinaries || {};

  glob.sync(`${binaryMockDataFolder}/**/*`)
    .forEach((filePath) => {
      const relFileName = path.relative(binaryMockDataFolder, filePath);
      global.mockBinaries[relFileName] = fs.readFileSync(filePath);
    });
};

module.exports = loadBinaries;
