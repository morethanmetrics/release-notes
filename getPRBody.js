const core = require('@actions/core');
const octokit = require('./ghClient');
const query = require('./pullRequests.gql');
const getStartTime = require('./utils').getStartTime;
const getEndTime = require('./utils').getEndTime;
const filterRelevantPRs = require('./utils').filterRelevantPRs;
const composeBody = require('./utils').composeBody;

const getPRBody = async (duration) => {
  const startTime = getStartTime(duration);
  const startTimeString = startTime.toISOString().split('T')[0];

  core.info(`Getting PRs merged after ${startTimeString} ...`);

  const query_string = `is:merged is:pr repo:morethanmetrics/smaply label:release created:>=${startTimeString}`;

  const variables = {
    query_string,
  };

  const result = await octokit.graphql(query, variables);

  const endTime = getEndTime(duration, startTime);

  const prs = result.data.search.edges;

  const filteredPRs = filterRelevantPRs(prs, endTime, startTime);

  const finalBody = composeBody(filteredPRs);

  return finalBody;
};

module.exports = getPRBody;
