import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // npm install node-fetch

import {
  Reporter,
  TestCase,
  TestResult,
  FullResult
} from '@playwright/test/reporter';

class AdvancedReporter implements Reporter {
  private results: any[] = [];
  private startTime: number = 0;

  onBegin() {
    this.startTime = Date.now();
    console.log('🚀 Test run started');
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const testData = {
      name: test.title,
      status: result.status,
      duration: result.duration,
      retries: result.retry,
      error: result.error?.message || null,
      file: test.location.file
    };

    // Detect flaky
    if (result.retry > 0 && result.status === 'passed') {
      testData['flaky'] = true;
    }

    this.results.push(testData);

    // 🔴 Immediate Slack alert on failure
    // if (result.status === 'failed') {
    //   this.sendSlackAlert(testData);
    // }
  }

  async onEnd(result: FullResult) {
    const duration = (Date.now() - this.startTime) / 1000;

    const summary = {
      status: result.status,
      total: this.results.length,
      passed: this.results.filter(r => r.status === 'passed').length,
      failed: this.results.filter(r => r.status === 'failed').length,
      flaky: this.results.filter(r => r.flaky).length,
      duration
    };

    const finalReport = {
      summary,
      tests: this.results
    };

    // 📁 Save JSON report
    const filePath = path.join(process.cwd(), 'custom-report.json');
    fs.writeFileSync(filePath, JSON.stringify(finalReport, null, 2));

    console.log('📊 Custom report saved:', filePath);

    // Optional: send summary to Slack
    // if (summary.failed > 0) {
    //   await this.sendSlackSummary(summary);
    // }
  }

  // -----------------------------
  // Slack Integration
  // -----------------------------
//   private async sendSlackAlert(testData: any) {
//     const webhook = process.env.SLACK_WEBHOOK;

//     if (!webhook) return;

//     const message = {
//       text: `❌ Test Failed: ${testData.name}\nError: ${testData.error}`
//     };

//     try {
//       await fetch(webhook, {
//         method: 'POST',
//         body: JSON.stringify(message),
//         headers: { 'Content-Type': 'application/json' }
//       });
//     } catch (err) {
//       console.error('Slack alert failed:', err);
//     }
//   }

//   private async sendSlackSummary(summary: any) {
//     const webhook = process.env.SLACK_WEBHOOK;

//     if (!webhook) return;

//     const message = {
//       text: `📊 Test Summary:
// Total: ${summary.total}
// Passed: ${summary.passed}
// Failed: ${summary.failed}
// Flaky: ${summary.flaky}
// Duration: ${summary.duration}s`
//     };

//     try {
//       await fetch(webhook, {
//         method: 'POST',
//         body: JSON.stringify(message),
//         headers: { 'Content-Type': 'application/json' }
//       });
//     } catch (err) {
//       console.error('Slack summary failed:', err);
//     }
//   }
}

export default AdvancedReporter;