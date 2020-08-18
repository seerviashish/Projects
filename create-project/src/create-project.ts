import chalk from "chalk";
import { join } from "path";
import { CreateProjectExtraOptions } from "./utils";
import { Tasks } from "./task";
import ora from "ora";

export const createProjectStart = async (
  { workingDirectory, branchName, projectName }: CreateProjectExtraOptions,
  tasks: Tasks
): Promise<void> => {
  const projectSetupSpinner = ora(`Project Setup  - ${projectName}`).start();
  try {
    console.log();
    await tasks.createOrphanBranch(branchName, workingDirectory);
    console.log(`✅ ${chalk.grey(`Orphan branch ${branchName} is created.`)}`);
    await tasks.cleanFolder(workingDirectory);
    console.log(`✅ ${chalk.grey(`Removed other files from project.`)}`);
    await tasks.removeGitIgnore(workingDirectory);
    console.log(`✅ ${chalk.grey(`Removed .gitignore file from project.`)}`);
    await tasks.setUpReadMe(projectName, workingDirectory);
    console.log(`✅ ${chalk.grey(`README.md file created.`)}`);
    await tasks.stageAllFiles(workingDirectory);
    console.log(`✅ ${chalk.grey(`Git move all files to staging.`)}`);
    await tasks.initialCommit(projectName, workingDirectory);
    console.log(`✅ ${chalk.grey(`Initial commit.`)}`);
    await tasks.gitPushBranch(branchName, workingDirectory);
    console.log(`✅ ${chalk.grey(`Push initial commit.`)}`);
    projectSetupSpinner.succeed();
  } finally {
    projectSetupSpinner.stop();
  }
};
