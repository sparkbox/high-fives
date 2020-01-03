const shell = require('shelljs');

console.log(`Starting site for ${process.env.NODE_ENV || 'development'}`);

const tasks = {
  production: ['copy', 'patterns'],

  // JS isn't present here because watch
  // does an initial render.
  development: ['copy', 'patterns', 'server', 'watch'],
};

function parallelTasks(env) {
  const list = tasks[env].map(task => `"npm run ${task}" `);

  return `parallelshell ${list.join('')}`;
}

if (process.env.CONTEXT === 'production') {
  shell.exec(parallelTasks('production'));
} else {
  shell.exec(parallelTasks('development'));
}
