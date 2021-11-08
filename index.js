const core = require('@actions/core');
const getPRBody = require('./getPRBody');
const findOrCreateReleaseFile = require('./io').findOrCreateReleaseFile
const getFilePath = require('./io').getFilePath
const durationString = require('./utils').durationString
const upsertContentSync = require('./io').upsertContent

async function run() {
  try {
    const duration = core.getInput('duration');
    core.info(`Getting PR body for ${duration} ...`);
    const body = await getPRBody(duration);

    core.info(`Find or create the release file`);
    await findOrCreateReleaseFile(duration)

    core.info(`Get file name`)
    const filePath = getFilePath(duration)

    core.info(`Build content`)
    const content = `Release notes for the ${durationString(duration)}\n${body}\n\n`

    upsertContentSync(filePath, content)

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
