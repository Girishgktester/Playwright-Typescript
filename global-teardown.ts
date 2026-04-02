import fs from 'fs';
import path from 'path';

async function globalTeardown() {
  // This runs after ALL tests complete
  // Generate custom report from test results if they exist
  
  const reportPath = path.join(process.cwd(), 'custom-report.json');
  
  // Check if blob reports exist
  const blobDir = path.join(process.cwd(), 'blob-report');
  
  if (fs.existsSync(blobDir)) {
    try {
      const files = fs.readdirSync(blobDir);
      const hasTests = files.length > 0;
      
      if (hasTests) {
        const report = {
          summary: {
            totalTests: files.length,
            timestamp: new Date().toISOString()
          },
          blobReports: files
        };
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log('✅ Custom report generated:', reportPath);
      }
    } catch (e) {
      // Silently skip if no blob reports yet
    }
  }
}

export default globalTeardown;
