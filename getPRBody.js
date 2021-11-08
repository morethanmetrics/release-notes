const github = require('@actions/github');
const core = require('@actions/core');
const query = require('./pullRequests.gql')
const getStartOfLastWeek = require('./utils').getStartOfLastWeek
const getStartOfLastMonth = require('./utils').getStartOfLastMonth

const getPRBody = async (duration) => {
  const myToken = core.getInput('github_token');
  const octokit = github.getOctokit(myToken);

  let timeAfter;
  if (duration.toLowerCase() === 'last week') {
    timeAfter = getStartOfLastWeek()
  } else if (duration.toLowerCase() === 'last month') {
    timeAfter =  getStartOfLastMonth()
  }

  const timeAfterString = timeAfter.toISOString().split('T')[0]

  core.info(`Getting PRs merged after ${timeAfterString} ...`);

  const query_string = `is:merged is:pr repo:morethanmetrics/smaply label:release created:>=${timeAfterString}`

  const variables = {
    query_string
  }

  const result = await octokit.graphql(query, variables);

  const data = result.data;

  let timeBefore;
  if (duration.toLowerCase() === 'last week') {
    const last = timeAfter.setDate(timeAfter.getDate() + 6)
    timeBefore = new Date(last)
  } else if (duration.toLowerCase() === 'last month') {
    const year = timeAfter.getFullYear()
    const month = timeAfter.getMonth()
    timeBefore = new Date(year, month + 1, 0)
  }

  timeBefore.setHours(23)
  timeBefore.setMinutes(59)
  timeBefore.setSeconds(59)

  const prs = data.search.edges;

  const filteredPRs = prs.filter(pr => {
    const mergedAt = new Date(pr.mergedAt).getTime();
    return (timeAfter.getTime() < mergedAt && mergedAt < timeBefore.getTime())
  })

  const finalBody = filteredPRs.map((edge) => edge.node.body).join("\n");

  return finalBody
}

module.exports = getPRBody;
