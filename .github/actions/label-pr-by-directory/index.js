const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github_token', { required: true });
    const octokit = github.getOctokit(token);
    const context = github.context;

    if (context.eventName !== 'pull_request') {
      core.info('This action only runs on pull_request events.');
      return;
    }

    const { owner, repo } = context.repo;
    const pull_number = context.payload.pull_request.number;

    // Get list of changed files
    const files = await octokit.paginate(
      octokit.rest.pulls.listFiles,
      { owner, repo, pull_number }
    );

    // Get unique top-level directories
    const dirs = new Set();
    for (const file of files) {
      const parts = file.filename.split('/');
      if (parts.length > 1) {
        dirs.add(parts[0]);
      }
    }

    if (dirs.size === 0) {
      core.info('No top-level directories changed.');
      return;
    }

    // Add labels for each directory
    const labels = Array.from(dirs);
    core.info(`Adding labels: ${labels.join(', ')}`);
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: pull_number,
      labels
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();