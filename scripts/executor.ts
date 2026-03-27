import { exec } from 'child_process';

function run(cmd: string, label: string) {
  return new Promise<void>((resolve, reject) => {
    console.log(`\n[${label}] ${cmd}\n`);

    const p = exec(cmd);

    p.stdout?.on('data', d => console.log(`[${label}] ${d}`));
    p.stderr?.on('data', d => console.error(`[${label}] ${d}`));

    p.on('exit', () => resolve());
    p.on('error', reject);
  });
}

export async function execute(A: string[], B: string[]) {
  const remote = "user@192.168.1.5";
  const path = "C:\\Users\\user\\Documents\\Playwright shreading\\Playwright-Typescript";

//   const cmdA = `npx playwright test ${A.join(' ')}`;
const cmdA = `npx playwright test ${A.join(' ')} --reporter=blob --output=blob-report-A`;

// const cmdA = `npx playwright test ${A.join(' ')} --reporter=blob --output=blob-report`;


//   const cmdB = `ssh ${remote} "cd \\"${path}\\" && npx playwright test ${B.join(' ')}"`;
const cmdB = `ssh user@192.168.1.5 "cd \\"${path}\\" && npx playwright test ${B.join(' ')} --reporter=blob --output=blob-report-B"`;

// const cmdB = `ssh user@192.168.1.5 "cd \\"${path}\\" && npx playwright test ${B.join(' ')} --reporter=blob --output=blob-report"`;

  await Promise.all([
    run(cmdA, 'A'),
    run(cmdB, 'B')
  ]);

  
}