// import winston from 'winston';
// import path from 'path';
// import fs from 'fs';

// export function createLogger(testName: string) {
//   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

//   const safeTestName = testName.replace(/\s+/g, '_');

//   const logDir = path.join('logs');
//   if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir);
//   }

//   const fileName = `${safeTestName}_${timestamp}.log`;

//   return winston.createLogger({
//     level: 'info',
//     format: winston.format.combine(
//       winston.format.timestamp(),
//       winston.format.printf(({ timestamp, level, message }) => {
//         return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
//       })
//     ),
//     transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({
//         filename: path.join(logDir, fileName),
//       }),
//     ],
//   });
// }