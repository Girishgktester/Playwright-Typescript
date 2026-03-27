import fs from 'fs';
import path from 'path';

const report = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'custom-report.json'), 'utf-8')
);

const slowTests = [...report.tests]
  .sort((a, b) => b.duration - a.duration)
  .slice(0, 5);

const passPercent = report.summary.total
  ? Math.round((report.summary.passed / report.summary.total) * 100)
  : 0;

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    body {
      font-family: Arial;
      margin: 0;
      background: #0f172a;
      color: #e2e8f0;
    }

    .container { padding: 20px; max-width: 1200px; margin: auto; }

    .banner {
      text-align: center;
      padding: 15px;
      font-size: 20px;
      font-weight: bold;
      border-radius: 8px;
      margin-bottom: 10px;
      background: ${report.summary.failed > 0 ? '#7f1d1d' : '#14532d'};
    }

    .timestamp {
      text-align: center;
      font-size: 12px;
      opacity: 0.7;
      margin-bottom: 20px;
    }

    .cards {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .card {
      flex: 1;
      padding: 12px;
      background: #1e293b;
      border-radius: 8px;
      text-align: center;
    }

    .passed { color: #22c55e; }
    .failed { color: #ef4444; }
    .flaky { color: #f59e0b; }

    .progress {
      background: #334155;
      border-radius: 10px;
      overflow: hidden;
      height: 18px;
      margin: 15px 0;
    }

    .progress-bar {
      height: 100%;
      background: #22c55e;
      width: ${passPercent}%;
      text-align: center;
      font-size: 12px;
    }

    input {
      padding: 10px;
      width: 100%;
      margin: 15px 0;
      border-radius: 8px;
      border: none;
    }

    .filters button {
      margin-right: 8px;
      padding: 6px 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #334155;
      color: white;
    }

    .filters button.active {
      background: #22c55e;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #1e293b;
    }

    th, td {
      padding: 10px;
      border-bottom: 1px solid #334155;
    }

    tr:hover { background: #334155; }

    .hidden { display: none; }

    .error-box {
      background: #7f1d1d;
      padding: 10px;
      border-radius: 6px;
      font-size: 12px;
      white-space: pre-wrap;
    }

    .chart-container {
      width: 300px;
      margin: 20px auto;
    }

    .section { margin-top: 25px; }
  </style>
</head>

<body>
<div class="container">

  <div class="banner">
    ${report.summary.failed > 0 ? '❌ BUILD FAILED' : '✅ ALL TESTS PASSED'}
  </div>

  <div class="timestamp">
    Run at: ${new Date().toLocaleString()}
  </div>

  <div class="cards">
    <div class="card">Total<br>${report.summary.total}</div>
    <div class="card passed">Passed<br>${report.summary.passed}</div>
    <div class="card failed">Failed<br>${report.summary.failed}</div>
    <div class="card flaky">Flaky<br>${report.summary.flaky}</div>
    <div class="card">Duration<br>${report.summary.duration}s</div>
  </div>

  <div class="progress">
    <div class="progress-bar">${passPercent}%</div>
  </div>

  ${
    report.summary.failed > 0 || report.summary.flaky > 0
      ? `
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
  `
      : `<h3 style="text-align:center;color:#22c55e;">System Stable - No Failures</h3>`
  }

  <div class="section">
    <h3>🔥 Slowest Tests</h3>
    <ul>
      ${slowTests.map(t => `<li>${t.name} (${t.duration}ms)</li>`).join('')}
    </ul>
  </div>

  <input type="text" id="search" placeholder="Search tests...">

  <div class="filters">
    <button onclick="filterTests('all', this)" class="active">All</button>
    <button onclick="filterTests('failed', this)">Failed</button>
    <button onclick="filterTests('passed', this)">Passed</button>
    <button onclick="filterTests('flaky', this)">Flaky</button>
  </div>

  <div class="section">
    <h3>📋 Test Results</h3>
    <table id="table">
      <tr><th>Name</th><th>Status</th><th>Duration</th></tr>
      ${report.tests.map((t, i) => `
        <tr data-status="${t.status}" onclick="toggleError(${i})">
          <td>${t.name}</td>
          <td class="${t.status}">${t.status}</td>
          <td>${t.duration}</td>
        </tr>
        <tr id="error-${i}" class="hidden">
          <td colspan="3">
            ${t.error ? `<div class="error-box">${t.error}</div>` : ''}
          </td>
        </tr>
      `).join('')}
    </table>
  </div>

</div>

<script>
  ${
    report.summary.failed > 0 || report.summary.flaky > 0
      ? `
  new Chart(document.getElementById('chart'), {
    type: 'pie',
    data: {
      labels: ['Passed', 'Failed', 'Flaky'],
      datasets: [{
        data: [
          ${report.summary.passed},
          ${report.summary.failed},
          ${report.summary.flaky}
        ],
        backgroundColor: ['#22c55e','#ef4444','#f59e0b']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  });
  `
      : ''
  }

  function filterTests(status, btn) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('#table tr[data-status]').forEach(row => {
      row.style.display = (status === 'all' || row.dataset.status === status) ? '' : 'none';
    });
  }

  function toggleError(i) {
    document.getElementById('error-' + i).classList.toggle('hidden');
  }

  document.getElementById('search').addEventListener('input', function(e) {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll('#table tr[data-status]').forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(val) ? '' : 'none';
    });
  });
</script>

</body>
</html>
`;

fs.writeFileSync('custom-report.html', html);

console.log('✅ Clean dashboard generated');