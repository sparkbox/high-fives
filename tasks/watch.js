const chokidar = require("chokidar");
const path = require("path");
const shell = require("shelljs");
const exit = require("exit-hook");
const options = {
  ignoreDotFiles: true
};

const watcher = chokidar.watch(['source/scss','source/assets'], {
  ignored: /[\/\\]\./,
  ignoreInitial: true
});

watcher.on("change", f => checkTypeOfEvent(f));
watcher.on("add", f => checkTypeOfEvent(f));

/**
 * Does some checking on the file that changed
 *
 * @param f - file path that changed
 */
const checkTypeOfEvent = (f) => {
  const type = path.extname(f).split('.')[1];

  if (type === "scss") {
    buildStyles();
  } else if (f.search(/source\/assets/) != -1) {
    copyAssets();
  }
}

const buildStyles = () => {
  shell.exec('npm run styles', function(code, output){
    console.log('✨  Built new styles');
  });
}

const copyAssets = () => {
  shell.exec('npm run copy', function(code, output){
    console.log('Tell Ethan to implement a task for copying assets into public/');
    // console.log('👯  Copying assets');
  });
}

exit(function () {
  console.log('🗑  Cleaning up');
  watcher.close();
});
