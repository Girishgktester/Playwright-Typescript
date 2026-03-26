import { FileStat } from './parser';

export function balance(files: FileStat[]) {
  files.sort((a, b) => b.duration - a.duration);

  const A: FileStat[] = [];
  const B: FileStat[] = [];

  let tA = 0;
  let tB = 0;

  for (const f of files) {
    if (tA <= tB) {
      A.push(f);
      tA += f.duration;
    } else {
      B.push(f);
      tB += f.duration;
    }
  }

  return { A, B, tA, tB };
}