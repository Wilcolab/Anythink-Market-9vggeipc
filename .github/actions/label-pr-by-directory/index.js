const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get inputs
    const token = core.getInput('github-token', { required: true });
    
    // Get the pull request context
    const context = github.context;
    
    if (!context.payload.pull_request) {
      core.info('This action only runs on pull requests');
      return;
    }
    
    const octokit = github.getOctokit(token);
    const pullNumber = context.payload.pull_request.number;
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    
    core.info(`Processing PR #${pullNumber} in ${owner}/${repo}`);
    
    // Fetch the list of changed files
    const { data: files } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pullNumber,
      per_page: 100
    });
    
    core.info(`Found ${files.length} changed files`);
    
    // Extract top-level directories from file paths
    const directories = new Set();
    
    files.forEach(file => {
      const path = file.filename;
      // Get the first part of the path (top-level directory)
      const topLevelDir = path.split('/')[0];
      
      // Only add if it's actually a directory (contains a slash)
      if (path.includes('/')) {
        directories.add(topLevelDir);
      }
    });
    
    core.info(`Top-level directories affected: ${Array.from(directories).join(', ')}`);
    
    // Get existing labels on the PR
    const { data: existingLabels } = await octokit.rest.issues.listLabelsOnIssue({
      owner,
      repo,
      issue_number: pullNumber
    });
    
    const existingLabelNames = existingLabels.map(label => label.name);
    core.info(`Existing labels: ${existingLabelNames.join(', ')}`);
    
    // Add labels for each directory
    const labelsToAdd = Array.from(directories).filter(
      dir => !existingLabelNames.includes(dir)
    );
    
    if (labelsToAdd.length > 0) {
      // First, ensure the labels exist in the repository
      for (const labelName of labelsToAdd) {
        try {
          await octokit.rest.issues.getLabel({
            owner,
            repo,
            name: labelName
          });
          core.info(`Label '${labelName}' already exists`);
        } catch (error) {
          if (error.status === 404) {
            // Create the label if it doesn't exist
            await octokit.rest.issues.createLabel({
              owner,
              repo,
              name: labelName,
              color: Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
              description: `Changes in ${labelName}/ directory`
            });
            core.info(`Created new label '${labelName}'`);
          } else {
            throw error;
          }
        }
      }
      
      // Add labels to the PR
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: pullNumber,
        labels: labelsToAdd
      });
      
      core.info(`Added labels: ${labelsToAdd.join(', ')}`);
    } else {
      core.info('No new labels to add');
    }
    
    core.setOutput('labels-added', labelsToAdd.join(','));
    core.setOutput('directories', Array.from(directories).join(','));
    
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
