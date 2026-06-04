const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  content = content.replace(/\bml-(\d+|auto|px)\b/g, 'ms-');
  content = content.replace(/\bmr-(\d+|auto|px)\b/g, 'me-');
  content = content.replace(/\bpl-(\d+|auto|px)\b/g, 'ps-');
  content = content.replace(/\bpr-(\d+|auto|px)\b/g, 'pe-');
  content = content.replace(/\btext-right\b/g, 'text-start');
  content = content.replace(/\btext-left\b/g, 'text-end');
  content = content.replace(/\bleft-(\d+|auto|px)\b/g, 'start-');
  content = content.replace(/\bright-(\d+|auto|px)\b/g, 'end-');
  content = content.replace(/\b-left-(\d+|auto|px)\b/g, '-start-');
  content = content.replace(/\b-right-(\d+|auto|px)\b/g, '-end-');
  content = content.replace(/\bborder-l\b/g, 'border-s');
  content = content.replace(/\bborder-r\b/g, 'border-e');
  content = content.replace(/\bborder-l-(\d+|transparent|white\/.*|zinc-.*|blue-.*|red-.*|green-.*|purple-.*)\b/g, 'border-s-');
  content = content.replace(/\bborder-r-(\d+|transparent|white\/.*|zinc-.*|blue-.*|red-.*|green-.*|purple-.*)\b/g, 'border-e-');
  content = content.replace(/\brounded-l-([a-z2-9]+)\b/g, 'rounded-s-');
  content = content.replace(/\brounded-r-([a-z2-9]+)\b/g, 'rounded-e-');
  content = content.replace(/\brounded-l\b/g, 'rounded-s');
  content = content.replace(/\brounded-r\b/g, 'rounded-e');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
  }
});

console.log('Modified files:', changedCount);
