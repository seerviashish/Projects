import chalk from "chalk";
import { checkArgs } from "./args";
import { inquire } from "./inquire";
import {
  getIntro,
  CreateProjectArgsOptions,
  CreateProjectExtraOptions,
} from "./utils";
import { extraInfoOptions, LiveTasks } from "./task";
import { createProjectStart } from "./create-project";

(async () => {
  const argsInfo = await checkArgs();
  const userOptions: CreateProjectArgsOptions = argsInfo.isProjectNameGiven
    ? argsInfo
    : {
        ...argsInfo,
        ...(await (async () => {
          console.log(getIntro(process.stdout.columns));
          return inquire();
        })()),
      };
  const options: CreateProjectExtraOptions = extraInfoOptions(
    userOptions.category,
    userOptions.language,
    userOptions.projectName
  );
  return createProjectStart(options, LiveTasks);
})().catch((err: Error) => {
  console.error(`
  ${chalk.red(err.message)}
`);
  process.exit(1);
});
