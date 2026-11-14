const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const allureCli = require.resolve('allure-commandline/bin/allure');
const playwrightCli = require.resolve('@playwright/test/cli');
const requestedArgs = process.argv.slice(2);
const isSingleTestRun = requestedArgs[0] === '--single';
const testArgs = (isSingleTestRun ? requestedArgs.slice(1) : requestedArgs).map((arg) => (
  /\.(?:spec|test)\.[cm]?[jt]sx?$/i.test(arg) ? arg.replace(/\\/g, '/') : arg
));

function runNodeScript(script, args, env = process.env) {
  const result = spawnSync(process.execPath, [script, ...args], {
    env,
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  return result.status === null ? 1 : result.status;
}

if (isSingleTestRun && testArgs.length === 0) {
  console.error('Specify a test file or filter, for example: npm run test:single -- --grep "test title"');
  process.exitCode = 1;
} else {
  const resultsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'automation-allure-results-'));
  let testExitCode;

  try {
    testExitCode = runNodeScript(playwrightCli, ['test', ...testArgs], {
      ...process.env,
      ALLURE_RESULTS_DIR: resultsDir,
    });

    const generateExitCode = runNodeScript(allureCli, [
      'generate',
      resultsDir,
      '--clean',
      '-o',
      'allure-report',
    ]);
    if (generateExitCode !== 0) {
      process.exitCode = generateExitCode;
    } else if (process.env.CI) {
      process.exitCode = testExitCode;
    } else {
      const openExitCode = runNodeScript(allureCli, ['open', 'allure-report']);
      process.exitCode = openExitCode || testExitCode;
    }
  } catch (error) {
    console.error('Unable to run the test and Allure report workflow:', error);
    process.exitCode = 1;
  } finally {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }
}
