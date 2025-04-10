import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(process.cwd(), 'package.json');

function removeStartCleanScript() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (packageJson.scripts && packageJson.scripts['start-clean']) {
      delete packageJson.scripts['start-clean'];
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Removed "start-clean" script from package.json.');
    } else {
      console.log('"start-clean" script not found in package.json.');
    }
  } catch (error) {
    console.error('Error reading or writing package.json:', error);
  }
}

function emptyDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${directory} does not exist.`);
    return;
  }
  const items = fs.readdirSync(directory);
  for (const item of items) {
    const fullPath = path.join(directory, item);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
  console.log(`Deleted contents of ${directory}`);
}

function removeDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true, force: true });
    console.log(`Deleted directory ${directory}`);
  } else {
    console.log(`Directory ${directory} does not exist.`);
  }
}

function cleanProject() {
  console.log('Cleaning project...');

  const directoriesToEmpty = ['./components', './tests', './store'];
  directoriesToEmpty.forEach(emptyDirectory);

  // TODO: add './.git',
  const assetsDirToDelete = ['./.assets/img', './coverage', './.github', './.nuxt', './.output', './.vscode'];
  directoriesToEmpty.forEach(removeDirectory);

  removeStartCleanScript();

  fs.rmSync(__filename, { force: true });
  console.log(`Deleted clean-project.js script itself.`);
}

cleanProject();
