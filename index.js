#!/usr/bin/env node
const fs = require('fs');

const cache = require('./cache');
const exitCodes = require('./exit');

const help = command => {
  if (command !== 'help') {
    console.log(`Command ${command} not found!`);
  }
};

const cli = () => {
  const [_, baseName, command, ...args] = process.argv;

  const module = [`./cmd/${command}.js`, `./cmd/${command}/index.js`].find(
    path => fs.existsSync(path),
  );
  if (!module) {
    help(command);
    process.exit(exitCodes.COMMAND_NOT_FOUND);
  }

  require(module)(...args);
};

cli();
