const fs = require('fs');
const path = require('path');

const keepDirs = ['./components', './tests', './store'];
const removeDir = './.assets/img';
const thisFile = __filename;

function emptyDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  for (const file of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, file);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
  console.log(`✅ Content of "${dirPath}" deleted`);
}

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`❌ folder "${dirPath}" deleted`);
  } else {
    console.log(`⚠️ folder "${dirPath}" not found`);
  }
}

keepDirs.forEach(emptyDir);
removeDirectory(removeDir);

setTimeout(() => {
  fs.rmSync(thisFile, { force: true });
  console.log(`🧼 Script "${thisFile}" eliminated itself!.`);
  console.log(`🤌  you are ready to go.`);
}, 1000);
