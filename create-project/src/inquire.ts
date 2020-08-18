import { DistinctQuestion, prompt } from "inquirer";
import { validateInput, ArgsValidationInfo } from "./utils";
import categories from "./category";
import languages from "./languages";
import chalk from "chalk";
export const inquire = async () => {
  const projectCategoryQuestion: DistinctQuestion = {
    choices: categories,
    message: "⛏️ Select category for your project.",
    name: "category",
    type: "list",
  };

  const askProjectCategoryQuestion: DistinctQuestion = {
    message: "⛏️ Please write category for your project.",
    name: "category",
    type: "input",
  };

  const projectPrimaryLanguage: DistinctQuestion = {
    choices: languages,
    message: "💭Select primary programing language of your project",
    name: "language",
    type: "list",
  };

  const askProjectPrimaryLanguageQuestion: DistinctQuestion = {
    message: "⛏️ Please write your project primary language.",
    name: "language",
    type: "input",
  };

  const projectNameQuestion: DistinctQuestion = {
    message: "⚽Please enter your project name.",
    name: "projectName",
    type: "input",
  };

  const handleProjectCategoryQuestion = (): Promise<{
    readonly category: string;
  }> => {
    return prompt(projectCategoryQuestion)
      .then((categoryAnswer) => {
        const { category } = categoryAnswer as {
          readonly category: string;
        };
        if (category === "other") {
          return prompt(askProjectCategoryQuestion);
        } else {
          return { category };
        }
      })
      .then((categoryAnswer) => {
        const { category } = categoryAnswer as {
          readonly category: string;
        };
        const validationResult: ArgsValidationInfo = validateInput(category);
        if (validationResult.isValid) {
          return { category };
        } else {
          console.log(chalk.stderr(validationResult.msg));
          throw new Error(validationResult.msg);
        }
      });
  };

  const handleProjectPrimaryLanguage = (): Promise<{
    readonly language: string;
  }> => {
    return prompt(projectPrimaryLanguage)
      .then((languageAnswer) => {
        const { language } = languageAnswer as {
          readonly language: string;
        };
        if (language === "other") {
          return prompt(askProjectPrimaryLanguageQuestion);
        } else {
          return { language };
        }
      })
      .then((languageAnswer) => {
        const { language } = languageAnswer as {
          readonly language: string;
        };
        const validationResult: ArgsValidationInfo = validateInput(language);
        if (validationResult.isValid) {
          return { language };
        } else {
          console.log(chalk.stderr(validationResult.msg));
          throw new Error(validationResult.msg);
        }
      });
  };

  const handleProjectNameQuestion = (): Promise<{
    readonly projectName: string;
  }> => {
    return prompt(projectNameQuestion).then((projectNameAnswer) => {
      const { projectName } = projectNameAnswer as {
        readonly projectName: string;
      };
      const validationResult: ArgsValidationInfo = validateInput(projectName);
      if (validationResult.isValid) {
        return { projectName };
      } else {
        console.log(chalk.stderr(validationResult.msg));
        throw new Error(validationResult.msg);
      }
    });
  };

  const {
    category,
  }: { category: string } = await handleProjectCategoryQuestion();
  const {
    language,
  }: { language: string } = await handleProjectPrimaryLanguage();
  const {
    projectName,
  }: { projectName: string } = await handleProjectNameQuestion();

  return { category, language, projectName };
};
