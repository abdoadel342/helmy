const fs = require('fs');
const path = require('path');

const srcDir = path.join('e:\\التطبيق\\helmy', 'src');
const pagesDir = path.join(srcDir, 'pages');
const componentsDir = path.join(srcDir, 'components');

function replaceBackButtons(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceBackButtons(fullPath);
        } else if (file.endsWith('.tsx') && file !== 'BackButton.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            const regex = /<button[^>]*onClick=\{\(\)\s*=>\s*navigate\(-1\)\}[^>]*>[\s\S]*?<\/button>/g;
            
            if (regex.test(content)) {
                content = content.replace(regex, '<BackButton />');
                
                if (!content.includes("import { BackButton }")) {
                    let importPath = '';
                    if (dir === path.join(srcDir, 'components')) {
                        importPath = './BackButton';
                    } else if (dir.startsWith(path.join(srcDir, 'pages'))) {
                        const relativeToPages = path.relative(path.join(srcDir, 'pages'), dir);
                        const depthLevel = relativeToPages ? relativeToPages.split(path.sep).length : 0;
                        importPath = depthLevel === 0 ? '../components/BackButton' : '../'.repeat(depthLevel + 1) + 'components/BackButton';
                    } else {
                        importPath = '../components/BackButton';
                    }

                    const importStatement = `import { BackButton } from '${importPath}';\n`;
                    const matchImports = [...content.matchAll(/^import.*?;?\r?\n/gm)];
                    if (matchImports.length > 0) {
                        const lastImport = matchImports[matchImports.length - 1];
                        const insertPos = lastImport.index + lastImport[0].length;
                        content = content.substring(0, insertPos) + importStatement + content.substring(insertPos);
                    } else {
                        content = importStatement + content;
                    }
                }
                
                fs.writeFileSync(fullPath, content);
                console.log('Modified', fullPath);
                modified = true;
            }
        }
    }
}

replaceBackButtons(pagesDir);
replaceBackButtons(componentsDir);
console.log("Done");
