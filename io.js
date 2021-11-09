const fs = require('fs');

const findOrCreateReleaseFile = async (duration) => {
  const fileName = getFilePath(duration);
  await upsertFile(fileName);
};

const getFilePath = (duration) => {
  if (duration.toLowerCase() === 'last week') {
    return './weekly_release.md';
  } else if (duration.toLowerCase() === 'last month') {
    return './monthly_release.md';
  }
};

const upsertContentSync = (filePath, content) => {
  const curr_data = fs.readFileSync(filePath);
  const fd = fs.openSync(filePath, 'w+');
  const buffer = Buffer.from(content);

  fs.writeSync(fd, buffer, 0, buffer.length, 0);
  fs.writeSync(fd, curr_data, 0, curr_data.length, buffer.length);
  fs.close(fd, () => {
    console.info('File written');
  });
};

const upsertFile = async (file) => {
  try {
    // try to read file
    await fs.promises.readFile(file);
  } catch (error) {
    // create empty file, because it wasn't found
    await fs.promises.writeFile(file, '');
  }
};

module.exports = {
  findOrCreateReleaseFile,
  upsertContentSync,
  getFilePath
};
