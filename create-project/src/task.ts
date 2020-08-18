import execa, { Options } from "execa";
import { CreateProjectExtraOptions } from "./utils";
import chalk from "chalk";

export const createOrphanBranch = (
  spawner: typeof execa,
  suppressOutput = false
) => async (branchName: string, workingDirectory: string) => {
  const args = ["checkout", "--orphan", branchName];
  try {
    await spawner("git", args, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
  } catch (err) {
    if (err.exitCodeName === "ENOENT") {
      throw new Error(`
      Git is not installed on your PATH. Please install Git and try again.
      For more information, visit: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
      `);
    } else {
      throw new Error(`Git orphan branch creation failed.`);
    }
  }
};

export const removeAllContent = (
  spawner: typeof execa,
  suppressOutput = false
) => async (workingDirectory: string) => {
  const args = ["rm", "-rf", ".", "--ignore-unmatch"];
  try {
    await spawner("git", args, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
  } catch (err) {
    throw new Error(`Git failed to remove content.`);
  }
};

export const removeGitIgnore = (
  spawner: typeof execa,
  suppressOutput = false
) => async (workingDirectory: string) => {
  const args = ["-f", ".gitignore"];
  try {
    await spawner("rm", args, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
  } catch (err) {
    throw new Error(`Git failed to remove .gitignore file.`);
  }
};

export const setUpReadMe = (
  spawner: typeof execa,
  suppressOutput = false
) => async (projectName: string, workingDirectory: string) => {
  const args1 = ["README.md"];
  const args2 = [`#${projectName}`, ">", "README.md"];
  try {
    await spawner("touch", args1, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
    await spawner("echo", args2, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
  } catch (err) {
    throw new Error(`Git failed to setup readme file.`);
  }
};

export const stageAllFiles = (
  spawner: typeof execa,
  suppressOutput = false
) => async (workingDirectory: string) => {
  const args = ["add", "."];
  try {
    await spawner("git", args, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
  } catch (err) {
    throw new Error(`Git failed to move all files to staging.`);
  }
};

export const initialCommit = (
  spawner: typeof execa,
  suppressOutput = false
) => async (projectName: string, workingDirectory: string) => {
  const args = ["commit", "-a", "-m", `proj(setup): #${projectName} init`];
  try {
    await spawner("git", args, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
  } catch (err) {
    throw new Error(`Git failed to initial commit.`);
  }
};

export const gitPushBranch = (
  spawner: typeof execa,
  suppressOutput = false
) => async (branchName: string, workingDirectory: string) => {
  const args = ["push", "origin", branchName];
  try {
    await spawner("git", args, {
      cwd: workingDirectory,
      stdio: suppressOutput ? "pipe" : "inherit",
    });
  } catch (err) {
    throw new Error(`Git failed to push commit.`);
  }
};

export const extraInfoOptions = (
  category: string,
  language: string,
  projectName: string
): CreateProjectExtraOptions => {
  return {
    workingDirectory: process.cwd(),
    branchName: category + "/" + language + "/" + projectName,
    projectName,
  };
};

export interface Tasks {
  readonly createOrphanBranch: (
    branchName: string,
    workingDirectory: string
  ) => Promise<void>;
  readonly cleanFolder: (workingDirectory: string) => Promise<void>;
  readonly removeGitIgnore: (workingDirectory: string) => Promise<void>;
  readonly setUpReadMe: (
    projectName: string,
    workingDirectory: string
  ) => Promise<void>;
  readonly stageAllFiles: (workingDirectory: string) => Promise<void>;
  readonly initialCommit: (
    projectName: string,
    workingDirectory: string
  ) => Promise<void>;
  readonly gitPushBranch: (
    branchName: string,
    workingDirectory: string
  ) => Promise<void>;
}

export const LiveTasks: Tasks = {
  createOrphanBranch: createOrphanBranch(execa),
  cleanFolder: removeAllContent(execa),
  removeGitIgnore: removeGitIgnore(execa),
  setUpReadMe: setUpReadMe(execa),
  stageAllFiles: stageAllFiles(execa),
  initialCommit: initialCommit(execa),
  gitPushBranch: gitPushBranch(execa),
};
