import { execSync } from 'child_process';

const files = process.env.FILES?.split(',') || [];

const command = `npx playwright test ${files.join(' ')}`;

execSync(command, { stdio: 'inherit' });