const core = require('@actions/core');
const getPRBody = require('./getPRBody');
const findOrCreateReleaseFile = require('./io').findOrCreateReleaseFile;
const getFilePath = require('./io').getFilePath;
const durationString = require('./utils').durationString;
const upsertContentSync = require('./io').upsertContentSync;

async function run() {
  try {
    const duration = core.getInput('duration');

    if (duration.toLowerCase() !== 'last week' || duration.toLowerCase() !== 'last month') {
      core.error('Invalid duration value. Has to be one of "last week" or "last month"')
    }

    const content = await core.group(`Getting release body for ${duration}`, async () => {
      const prBody = await getPRBody(duration);
      const content = `### Release notes for the ${durationString(duration)}\n\n${prBody}\n\n`;
      return content;
    });

    await core.group('Write to the file', async () => {
      core.info(`Find or create the release file`);
      await findOrCreateReleaseFile(duration);

      core.info(`Get file name`);
      const filePath = getFilePath(duration);

      upsertContentSync(filePath, content);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
