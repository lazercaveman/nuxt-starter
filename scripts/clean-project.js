import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const keepDirs = ['./components', './tests', './store', './coverage', './.github', './.nuxt', './.output', './.git', './.vscode'];
const removeDir = './assets/img';
const thisFile = __filename;

function emptyDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  for (const file of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, file);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
  console.log(`✅ Inhalte aus "${dirPath}" gelöscht`);
}

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`❌ Ordner "${dirPath}" gelöscht`);
  } else {
    console.log(`⚠️ Ordner "${dirPath}" nicht gefunden`);
  }
}

keepDirs.forEach(emptyDir);
removeDirectory(removeDir);

setTimeout(() => {
  fs.rmSync(thisFile, { force: true });
  console.log(`🧼 Script "${thisFile}" wurde gelöscht`);
}, 100);
