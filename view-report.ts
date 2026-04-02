import fs from 'fs';
import path from 'path';

type TestResult = {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string | null;
  flaky?: boolean;
};

type Summary = {
  status: string;
  total: number;
  passed: number;
  failed: number;
  flaky: number;
  duration: number;
};

type Report = {
  summary: Summary;
  tests: TestResult[];
};

// 📁 Read JSON file
const filePath = path.join(process.cwd(), 'custom-report.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const report: Report = JSON.parse(rawData);

// 📊 Print Summary
console.log('\n=== TEST SUMMARY ===');
console.log(report.summary);

// ❌ Print Failed Tests
console.log('\n=== FAILED TESTS ===');

const failedTests = report.tests.filter(t => t.status === 'failed');

if (failedTests.length === 0) {
  console.log('No failed tests 🎉');
} else {
  failedTests.forEach(t => {
    console.log(`- ${t.name}`);
    console.log(`  Error: ${t.error ?? 'No error message'}\n`);
  });
}

// 🟡 Print Flaky Tests
console.log('\n=== FLAKY TESTS ===');

const flakyTests = report.tests.filter(t => t.flaky);

if (flakyTests.length === 0) {
  console.log('No flaky tests');
} else {
  flakyTests.forEach(t => {
    console.log(`- ${t.name}`);
  });
}