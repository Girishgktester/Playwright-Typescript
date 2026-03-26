import fs from 'fs';

type TestResult = {
  file: string;
  duration: number;
};

const report = JSON.parse(fs.readFileSync('report.json', 'utf-8'));

const fileMap = new Map<string, number>();

// Extract durations
function extractSuites(suites: any[]) {
  for (const suite of suites) {
    if (suite.file && suite.specs) {
      for (const spec of suite.specs) {
        for (const test of spec.tests || []) {
          for (const result of test.results || []) {
            const file = suite.file;
            const duration = result.duration || 0;

            fileMap.set(file, (fileMap.get(file) || 0) + duration);
          }
        }
      }
    }

    if (suite.suites) {
      extractSuites(suite.suites);
    }
  }
}

extractSuites(report.suites);

// Convert to array
const files = Array.from(fileMap.entries()).map(([file, duration]) => ({
  file,
  duration,
}));

// Sort heavy → light
files.sort((a, b) => b.duration - a.duration);

// Greedy split
const shardA: TestResult[] = [];
const shardB: TestResult[] = [];

let timeA = 0;
let timeB = 0;

for (const file of files) {
  if (timeA <= timeB) {
    shardA.push(file);
    timeA += file.duration;
  } else {
    shardB.push(file);
    timeB += file.duration;
  }
}


console.log('\n=== SHARD A ===');
shardA.forEach(f => console.log(f.file, f.duration));
console.log('Total:', timeA);

console.log('\n=== SHARD B ===');
shardB.forEach(f => console.log(f.file, f.duration));
console.log('Total:', timeB);

// 👇 ADD THIS HERE (VERY END)

console.log('\nRun A:');
console.log(`npx playwright test ${shardA.map(f => f.file).join(' ')}`);

console.log('\nRun B:');
console.log(`npx playwright test ${shardB.map(f => f.file).join(' ')}`);

