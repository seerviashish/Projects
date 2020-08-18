import meow from "meow";
import {
  CreateProjectArgsOptions,
  validateInput,
  ArgsValidationInfo,
} from "./utils";

export const checkArgs = async (): Promise<CreateProjectArgsOptions> => {
  const cli = meow(
    `
    Usage
      $npx create-project 

    Non-Interactive Usage
      $npx create-project <project-name> [options]

    Options
      --category, -C      project category
      --language, -L      project primary language
    
    Non-Interactive Example
      $ npx create-project my-project -C projects -L java
    `,
    {
      flags: {
        category: {
          alias: "C",
          default: "learn",
          type: "string",
        },
        language: {
          alias: "L",
          default: "other",
          type: "string",
        },
      },
    }
  );

  const input = cli.input[0];

  if (!input) {
    // If input args project-name is not given, return to collect option in interactive mode.

    return {
      isProjectNameGiven: false,
      projectName: "",
      category: "",
      language: "",
    };
  }

  const validOrMsg: ArgsValidationInfo = await validateInput(input);
  if (!validOrMsg.isValid) {
    throw new Error(validOrMsg.msg);
  }
  return {
    isProjectNameGiven: true,
    projectName: input,
    category: cli.flags.category,
    language: cli.flags.language,
  };
};
