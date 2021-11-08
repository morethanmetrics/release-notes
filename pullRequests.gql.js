const query = `
query releasePRs($query_string: String!) {
  search(query: $query_string, type: ISSUE, first: 100) {
    issueCount
    edges {
      node {
        ... on PullRequest {
          number
          createdAt
          mergedAt
          title
          headRef {
            name
            repository {
              nameWithOwner
            }
          }
          body
        }
      }
    }
  }
}
`

module.exports = query
