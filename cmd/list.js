const chalk = require('chalk');

const formatDate = require('../date').formatDate;
const cache = require('../cache');
const exitCodes = require('../exit');

module.exports = (d, ...args) => {
  let tasks = cache.index();
  const toJSON = args.some(arg => arg === '--json');
  const state = args.find(arg => arg.indexOf('--state=') === 0);

  if (toJSON) {
    console.log(JSON.stringify(tasks));
    process.exit(0);
  }

  if (d) {
    const date = new Date(
      d.indexOf('-') > -1 || d.indexOf('/') > -1 ? d : parseInt(d, 10),
    );
    if (!(date instanceof Date) || isNaN(date.valueOf())) {
      console.log(chalk.bgRed.white.bold(`${d} is not a valid date value.`));
      process.exit(exitCodes.INVALID_DATE);
    }

    const formattedDate = formatDate(date, 'YYYY-MM-DD');
    tasks = tasks.filter(task => task.createdAt.indexOf(formattedDate) === 0);

    if (tasks.length === 0) {
      console.log(
        `${chalk.bgRed.white.bold(
          `No tasks were found for the date: ${formattedDate}`,
        )}.`,
      );
      process.exit(0);
    }

    console.log(
      `${chalk.bgBlue.white.bold(
        `Found the following tasks for the date: ${formattedDate}`,
      )}.`,
    );
  } else {
    console.log(`${chalk.bgBlue.white.bold(`All of your tasks`)}.`);
  }

  if (typeof state !== undefined) {
    if (state !== '--state=done' && state !== '--state=undone') {
      console.log(
        `${chalk.bgRed.white.bold(`Flag "${state}" is not recognized`)}.`,
      );
      process.exit(exitCodes.COMMAND_NOT_FOUND);
    }
    tasks = tasks.filter(task =>
      state === '--state=done' ? task.state === 'true' : task.state === 'false',
    );
  }

  console.log(`
Id                                     Updated At         State   Title
${tasks
  .map(
    task =>
      `${task.id} - ${formatDate(task.updatedAt, 'YYYY-MM-DD HH:mm')} - ${
        task.state === 'true' ? 'Done ' : '!Done'
      } - ${task.title}`,
  )
  .join('\n')}`);
};
