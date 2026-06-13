const fs = require('fs');
const path = require('path');

const basePath = 'e:\\التطبيق\\helmy\\src\\pages';
const files = [
  { file: 'StartingBlock.tsx', title: 'انطلاق السرعة (Starting Block)', varName: 'startExercises' },
  { file: 'MaxSpeed.tsx', title: 'السرعة القصوى (Max Speed)', varName: 'speedExercises' },
  { file: 'ExplosivePower.tsx', title: 'القوة الانفجارية (Explosive Power)', varName: 'powerExercises' },
  { file: 'SpeedEndurance.tsx', title: 'تحمل السرعة (Speed Endurance)', varName: 'endoExercises' },
  { file: 'AgilityTraining.tsx', title: 'الرشاقة (Agility)', varName: 'agilityExercises' },
  { file: 'BalanceTraining.tsx', title: 'التوازن (Balance)', varName: 'balanceExercises' },
  { file: 'NeuromuscularCoordination.tsx', title: 'التوافق العضلي العصبي', varName: 'neuroExercises' },
  { file: 'PlyometricsTraining.tsx', title: 'البليومتريك (Plyometrics)', varName: 'plyoExercises' },
  { file: 'ShortSprints.tsx', title: 'السرعات القصيرة (Short Sprints)', varName: 'shortSprintsExercises' },
];

let output = `import { Exercise } from '../types'; // Adjust as needed
\n`;

let speedDays = [];

for (const item of files) {
  const filePath = path.join(basePath, item.file);
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the exercises array
  const regex = new RegExp(`const ${item.varName}: Exercise\\[\\] = (\\[[\\s\\S]*?\\]);`, 'm');
  const match = content.match(regex);
  if (match) {
    output += `const ${item.varName}: Exercise[] = ${match[1]};\n\n`;
    speedDays.push(`{ title: '${item.title}', exercises: ${item.varName} }`);
  }
}

output += `export const speedProgramDays = [\n  ${speedDays.join(',\n  ')}\n];\n`;

fs.writeFileSync(path.join(basePath, 'speedData.ts'), output, 'utf8');
console.log('Successfully generated speedData.ts');
