module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: { 
      branches: 10,
      functions: 10,
      lines: 50,
      statements: 50
    },
  },
  reporters: [
    'default',
    [
      "jest-stare",
      {
        "resultDir": "results/jest-stare",
        "reportTitle": "jest-stare!",
        "additionalResultsProcessors": [
          "jest-html-reporter"
        ],
        "coverageLink": "../../coverage/lcov-report/index.html",
        "jestStareConfigJson": "jest-stare.json",
        "jestGlobalConfigJson": "globalStuff.json"
      }
    ]
  ]
}
