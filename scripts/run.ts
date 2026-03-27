// import { parseReport } from './parser';
// import { balance } from './balancer';
// import { execute } from './executor';

// async function main() {
//   const files = parseReport();

//   const { A, B, tA, tB } = balance(files);

//   console.log('\n=== SHARD A ===');
//   console.log(A.map(f => f.file));
//   console.log('Total:', tA);

//   console.log('\n=== SHARD B ===');
//   console.log(B.map(f => f.file));
//   console.log('Total:', tB);

//   await execute(
//     A.map(f => f.file),
//     B.map(f => f.file)
//   );
// }

// main();


// import { parseReport } from './parser';
// import { balance } from './balancer';
// import { execute } from './executor';
// import { execSync } from 'child_process';

// async function main() {
//   const files = parseReport();

//   const { A, B, tA, tB } = balance(files);

//   console.log('\n=== SHARD A ===');
//   console.log(A.map(f => f.file));
//   console.log('Total:', tA);

//   console.log('\n=== SHARD B ===');
//   console.log(B.map(f => f.file));
//   console.log('Total:', tB);

//   // 🔥 Run shards (must include blob in executor)
//   await execute(
//     A.map(f => f.file),
//     B.map(f => f.file)
//   );

//   // 🔥 Copy report from Laptop B → A
//   console.log('\nCopying reports from Laptop B...');
//   execSync(
//     `scp user@192.168.1.5:"C:\\Users\\user\\Documents\\Playwright shreading\\Playwright-Typescript\\blob-report-B\\*.zip" ./blob-report`,
//     { stdio: 'inherit' }
//   );

//   // 🔥 Merge reports
//   console.log('\nMerging reports...');
//   execSync(`npx playwright merge-reports blob-report`, {
//     stdio: 'inherit'
//   });

//   console.log('\n✅ Final merged report ready');
// }

// main();

import { parseReport } from './parser';
import { balance } from './balancer';
import { execute } from './executor';
import { execSync } from 'child_process';
import fs from 'fs';

async function main() {
  const files = parseReport();
  const { A, B, tA, tB } = balance(files);

  console.log('\n=== SHARD A ===');
  console.log(A.map(f => f.file));
  console.log('Total:', tA);

  console.log('\n=== SHARD B ===');
  console.log(B.map(f => f.file));
  console.log('Total:', tB);

  // 🔥 Clean old reports
  if (fs.existsSync('blob-report')) {
    fs.rmSync('blob-report', { recursive: true, force: true });
  }
  if (fs.existsSync('playwright-report')) {
    fs.rmSync('playwright-report', { recursive: true, force: true });
  }

  // 🔥 Run shards
  await execute(
    A.map(f => f.file),
    B.map(f => f.file)
  );

  // 🔥 Ensure folder exists
  if (!fs.existsSync('blob-report')) {
    fs.mkdirSync('blob-report');
  }

  // 🔥 Copy from Laptop B
  console.log('\nCopying reports from Laptop B...');
  execSync(
    `scp user@192.168.1.5:"C:\\Users\\user\\Documents\\Playwright shreading\\Playwright-Typescript\\blob-report\\*.zip" ./blob-report`,
    { stdio: 'inherit' }
  );

  // 🔥 Merge
  console.log('\nMerging reports...');
  execSync(`npx playwright merge-reports blob-report`, {
    stdio: 'inherit'
  });

  // 🔥 Open report
  console.log('\nOpening report...');
  execSync(`npx playwright show-report`, {
    stdio: 'inherit'
  });
}

main();