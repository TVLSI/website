const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
require('dotenv').config();

// Paths
const dataDir = 'data';
const ebDir = path.join('assets', 'images', 'eb');
const repoPath = process.env.TVLSI_DATA_REPO_PATH || path.join('..', 'website-data');
const sampleDataDir = path.join('sample-data', 'data');
const sampleEbDir = path.join('sample-data', 'eb');

// Command line arguments
const cleanOnly = process.argv.includes('--clean-only');
const useSample = process.argv.includes('--use-sample');

// Determine data source - command line flag overrides environment settings
const usePrivate = !useSample && (process.env.TVLSI_USE_PRIVATE_DATA === '1' || fs.existsSync('.use-tvlsi-data'));

function log(msg) {
  console.log(`[prep] ${msg}`);
}

// Clean function that only deletes files except README.md
function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    
    if (fs.statSync(fullPath).isDirectory()) {
      cleanDir(fullPath);
      // Remove empty subdirectories
      if (fs.readdirSync(fullPath).length === 0) fs.rmdirSync(fullPath);
    } else if (entry !== 'README.md') {
      fs.unlinkSync(fullPath);
    }
  }
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Copy directory function
function copyDir(src, dest, filter = () => true) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath, filter);
    } else if (filter(entry)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean directories function
function cleanDirectories() {
  // Ensure directories exist
  ensureDir(dataDir);
  ensureDir(ebDir);
  
  // Clean directories
  log('Cleaning directories');
  cleanDir(dataDir);
  cleanDir(ebDir);
}

// Main function
function prepareData() {
  // Clean directories first
  cleanDirectories();
  
  // If clean-only flag is set, stop here
  if (cleanOnly) {
    log('Clean-only mode, skipping data preparation');
    return;
  }
  
  if (!usePrivate) {
    log('Using local sample data');
    copyDir(sampleDataDir, dataDir, entry => entry.endsWith('.json'));
    copyDir(sampleEbDir, ebDir);
    return;
  }
  
  // Handle private data repository
  if (!fs.existsSync(repoPath)) {
    log(`Cloning private data repo from ${repoPath}`);
    try {
      execSync(`git clone git@github.com:TVLSI/website-data.git ${repoPath}`, {stdio: 'inherit'});
    } catch (err) {
      console.error('Failed to clone private data repository');
      process.exit(1);
    }
  } else {
    try {
      execSync('git pull', {cwd: repoPath, stdio: 'inherit'});
    } catch (err) {
      console.error('Failed to update private data repository');
    }
  }
  
  const generated = path.join(repoPath, 'generated-data');
  if (!fs.existsSync(generated)) {
    console.error('generated-data directory not found in private repo');
    process.exit(1);
  }
  
  log('Copying private data');
  
  // Copy JSON files
  for (const entry of fs.readdirSync(generated)) {
    if (entry.endsWith('.json')) {
      fs.copyFileSync(path.join(generated, entry), path.join(dataDir, entry));
    }
  }
  
  // Copy EB images
  const imgSrc = path.join(generated, 'images', 'eb');
  if (fs.existsSync(imgSrc)) {
    for (const img of fs.readdirSync(imgSrc)) {
      fs.copyFileSync(path.join(imgSrc, img), path.join(ebDir, img));
    }
  }
}

// Execute the script
prepareData();

