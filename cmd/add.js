const chalk = require('chalk');

const formatDate = require('../date').formatDate;
const cache = require('../cache');

module.exports = taskTitle => {
  const task = cache.add(taskTitle);

  console.log(
    `${chalk.bgBlue.white.bold('Task successfully created')}.

   Task info  Value
          id: ${task.id}
       title: ${task.title}
  created at: ${task.createdAt}`,
  );
};
