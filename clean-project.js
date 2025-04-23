import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// TODO: cleanup script should respect new folder structures

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const indexVuePath = path.resolve(process.cwd(), './pages/index.vue');

function removeCleanupScript() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (packageJson.scripts && packageJson.scripts['script:cleanup']) {
      delete packageJson.scripts['script:cleanup'];
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Removed "script:cleanup" script from package.json.');
    } else {
      console.log('"script:cleanup" script not found in package.json.');
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

function replaceIndexVueContent() {
  try {
    const newContent = `<template> 🚀 Here we go! </template>\n`;
    fs.writeFileSync(indexVuePath, newContent, 'utf-8');
    console.log('Replaced content of ./pages/index.vue');
  } catch (error) {
    console.error('Error updating ./pages/index.vue:', error);
  }
}

function cleanProject() {
  console.log('Cleaning project...');

  const directoriesToEmpty = ['./app/components', './app/tests', './app/store', './app/middleware', './server/middleware', './server/api'];
  directoriesToEmpty.forEach(emptyDirectory);

  const assetsDirToDelete = ['./app/.assets/img', './coverage', './.github', './.vscode', './.git', './SECURITY.md', './LICENSE'];
  assetsDirToDelete.forEach(removeDirectory);

  removeCleanupScript();
  replaceIndexVueContent();

  fs.rmSync(__filename, { force: true });
  console.log(`Deleted clean-project.js script itself.`);
}

cleanProject();
