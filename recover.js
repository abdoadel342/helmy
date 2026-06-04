const fs = require('fs');
const data = JSON.parse(fs.readFileSync('recover_landing.json', 'utf8'));
// Depending on how it's logged, the tool call might be deeply nested.
let code = '';
if (data.tool_calls) {
    const call = data.tool_calls.find(c => c.name === 'write_to_file' || c.name === 'multi_replace_file_content');
    if (call && call.args && call.args.CodeContent) {
        code = call.args.CodeContent;
    }
}
if (code) {
    fs.writeFileSync('./src/pages/LandingPage.tsx', code, 'utf8');
    console.log('Restored LandingPage.tsx');
} else {
    console.log('Could not extract CodeContent');
}
