### Experimental

Use with caution

### To be used in conjunction with grassedge/git-pr-release-action@v1.0

### Usage

```yaml
- id: write-release-notes
  name: Write release notes
  uses: morethanmetrics/release-notes@main
  with:
    duration: last month
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

- duration: One of ['last month', 'last week']
- last month - release notes for last month
- last week - release notes for last week

### Outputs

- body
