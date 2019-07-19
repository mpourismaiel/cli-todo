const fs = require('fs');

const formatDate = require('./date').formatDate;

const standardFormat = 'YYYY-MM-DD HH:mm';

const UUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const serialize = task =>
  `${task.id}::${task.title}::${task.state || false}::${task.createdAt}::${
    task.updatedAt
  }`;

const deserialize = line => {
  const [id, title, state, createdAt, updatedAt] = line.split('::');
  return { id, title, state, createdAt, updatedAt };
};

module.exports = (function() {
  if (!fs.existsSync('.cache')) {
    fs.mkdirSync('.cache');
  }

  if (!fs.existsSync('.cache/tasks')) {
    fs.writeFileSync('.cache/tasks', '', 'utf-8');
  }

  const index = toString => {
    const cache = fs.readFileSync('.cache/tasks', 'utf-8');

    if (toString) {
      return cache;
    }

    return cache
      .split('\n')
      .filter(Boolean) // Ensure line is not empty
      .map(deserialize);
  };

  const add = line => {
    const cache = index(true);
    const id = UUID();
    const task = serialize({
      id,
      title: line.trim(),
      createdAt: formatDate(Date.now(), standardFormat),
      updatedAt: formatDate(Date.now(), standardFormat),
    });

    fs.writeFileSync('.cache/tasks', `${cache}${task}\n`, 'utf-8');

    return deserialize(task);
  };

  const del = id => {
    fs.writeFileSync(
      '.cache/tasks',
      index()
        .filter(cached => cached.id !== id)
        .map(serialize)
        .join('\n'),
      'utf-8',
    );
  };

  const update = (id, { title, state }) => {
    let updated = null;
    fs.writeFileSync(
      '.cache/tasks',
      index()
        .map(cached => {
          if (cached.id !== id) {
            return cached;
          }

          updated = {
            ...cached,
            title: title || cached.title,
            state: typeof state === 'undefined' ? cached.state : state,
            updatedAt: formatDate(Date.now(), standardFormat),
          };
          return updated;
        })
        .map(serialize)
        .join('\n'),
      'utf-8',
    );

    return updated;
  };

  return {
    index,
    add,
    del,
    update,
  };
})();
