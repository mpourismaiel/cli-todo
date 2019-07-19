const chalk = require('chalk');

const cache = require('../cache');

module.exports = id => {
  const task = cache.update(id, { state: true });
  console.log(
    `${chalk.bgBlue.white.bold('Task successfully updated')}.

   Task info  Value
          id: ${task.id}
       title: ${task.title}
       state: ${task.state}
  updated at: ${task.updatedAt}`,
  );
};
