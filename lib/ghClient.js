const core = require('@actions/core');
const github = require('@actions/github');

const getOctokit = () => {
  const myToken = core.getInput('github_token');
  return github.getOctokit(myToken);
};

module.exports = getOctokit;
