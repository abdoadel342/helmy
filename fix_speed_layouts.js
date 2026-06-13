const fs = require('fs');
const path = require('path');

const filesToFix = [
  'AgilityTraining.tsx',
  'BalanceTraining.tsx',
  'ExplosivePower.tsx',
  'MaxSpeed.tsx',
  'NeuromuscularCoordination.tsx',
  'PlyometricsTraining.tsx',
  'ShortSprints.tsx',
  'SpeedEndurance.tsx',
  'StartingBlock.tsx'
];

const basePath = 'e:\\التطبيق\\helmy\\src\\pages';

for (const file of filesToFix) {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file}, not found.`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const headerRegex = /<header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-\[#0e0e0e\]\/80 backdrop-blur-xl border-b border-white\/5">/g;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, '<header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-4 -mx-4 md:-mx-8">');
    changed = true;
  }

  const heroRegex = /\{\/\*\s*Hero Section\s*\*\/\}\s*<div className="mx-4 mt-4 rounded-3xl overflow-hidden/g;
  if (heroRegex.test(content)) {
    content = content.replace(heroRegex, '{/* Hero Section */}\n        <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8"');
    // Wait, the original was: <div className="mx-4 mt-4 rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end">
    // We replaced the first part, let's just do a simpler string replace.
  }

  // Let's do string replacement for safety
  const oldHeader = '<header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5">';
  const newHeader = '<header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5 mb-4 -mx-4 md:-mx-8">';
  if (content.includes(oldHeader)) {
    content = content.replace(oldHeader, newHeader);
    changed = true;
  }

  const oldHero = '{/* Hero Section */}\n        <div className="mx-4 mt-4 rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end">';
  const newHero = '{/* Hero Section */}\n        <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8">';
  if (content.includes(oldHero)) {
    content = content.replace(oldHero, newHero);
    changed = true;
  }
  
  // also handle \r\n
  const oldHeroRN = '{/* Hero Section */}\r\n        <div className="mx-4 mt-4 rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end">';
  const newHeroRN = '{/* Hero Section */}\r\n        <div className="rounded-3xl overflow-hidden p-6 relative shadow-2xl min-h-[180px] flex flex-col justify-end mb-8">';
  if (content.includes(oldHeroRN)) {
    content = content.replace(oldHeroRN, newHeroRN);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No changes needed for ${file}`);
  }
}
