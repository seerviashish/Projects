import chalk from "chalk";
import * as gradient from "gradient-string";
import { normalize } from "path";

export type ArgsValidationInfo = {
  isValid: boolean;
  msg: string;
};

export const getIntro = (columns: number | undefined) => {
  const ascii = `
       ██████ ██████  ███████  █████  ████████ ███████     ██████  ██████   ██████       ██ ███████  ██████ ████████ 
      ██      ██   ██ ██      ██   ██    ██    ██          ██   ██ ██   ██ ██    ██      ██ ██      ██         ██    
      ██      ██████  █████   ███████    ██    █████ █████ ██████  ██████  ██    ██      ██ █████   ██         ██    
      ██      ██   ██ ██      ██   ██    ██    ██          ██      ██   ██ ██    ██ ██   ██ ██      ██         ██    
       ██████ ██   ██ ███████ ██   ██    ██    ███████     ██      ██   ██  ██████   █████  ███████  ██████    ██    


      `;

  const asciiSmaller = `
    ╔═╗┬─┐┌─┐┌─┐┌┬┐┌─┐  ╔═╗┬─┐┌─┐ ┬┌─┐┌─┐┌┬┐
    ║  ├┬┘├┤ ├─┤ │ ├┤───╠═╝├┬┘│ │ │├┤ │   │ 
    ╚═╝┴└─└─┘┴ ┴ ┴ └─┘  ╩  ┴└─└─┘└┘└─┘└─┘ ┴ 

  `;
  return columns && columns >= 85
    ? chalk.bold(gradient.mind(ascii))
    : columns && columns >= 74
    ? chalk.bold(gradient.mind(asciiSmaller))
    : `\n${chalk.cyan.bold.underline("Create-Project")}\n`;
};

/**
 * On Windows, normalize returns "\\" as the path separator.
 * This method normalizes with POSIX.
 */
export const normalizePath = (path: string) =>
  normalize(path).replace(/\\/g, "/");

export const validateInput = (input: string): ArgsValidationInfo => {
  const validationResult: boolean = /^[a-z\-]+$/.test(input);
  if (validationResult) {
    return {
      isValid: true,
      msg: "",
    };
  }
  return {
    isValid: false,
    msg: "Input must contains only small characters [a to z] and dash(-).",
  };
};

export interface CreateProjectRequiredConfig {
  isProjectNameGiven: boolean;
  projectName: string;
}

export interface CreateProjectCLIOptions {
  readonly category: string;
  readonly language: string;
}

export type CreateProjectArgsOptions = CreateProjectRequiredConfig &
  CreateProjectCLIOptions;

export interface CreateProjectExtraOptions {
  workingDirectory: string;
  branchName: string;
  projectName: string;
}
