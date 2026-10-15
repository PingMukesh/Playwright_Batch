module.exports = {
  default: {
    // Feature files path
    paths: [
      'features/**/*.feature'
    ],
    // TypeScript loader
    requireModule: [
      'ts-node/register'
    ],
    // Step definitions and support code (hooks, world)
    require: [
      'features/support/**/*.ts',
      'features/step-def/**/*.ts'
    ],
    // Report formats
    format: [
      'summary',
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    dryRun: false,
    parallel: 1
  }
};
