import fs from 'fs';

export type FileStat = {
  file: string;
  duration: number;
};

export function parseReport(path = 'report.json'): FileStat[] {
  const report = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const map = new Map<string, number>();

  function walk(suites: any[]) {
    for (const suite of suites) {
      if (suite.file && suite.specs) {
        for (const spec of suite.specs) {
          for (const test of spec.tests || []) {
            for (const r of test.results || []) {
              map.set(
                suite.file,
                (map.get(suite.file) || 0) + (r.duration || 0)
              );
            }
          }
        }
      }
      if (suite.suites) walk(suite.suites);
    }
  }

  walk(report.suites);

  return Array.from(map.entries()).map(([file, duration]) => ({
    file: `tests/${file}`, // ensure correct path
    duration,
  }));
}