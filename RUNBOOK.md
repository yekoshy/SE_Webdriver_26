# optional: running tests
# in package.json edit script line

"scripts": {
    "test:all": "mocha --recursive --reporter mochawesome --reporter-options reportDir=reports,reportFilename=full_suite_result,quiet=true",
  "test:seven": "mocha test/SevenCharVal --reporter mochawesome --reporter-options reportDir=reports,reportFilename=SevenCharVal_result,quiet=true",
    "test:folder": "cross-env-shell mocha test/$FOLDER --reporter mochawesome --reporter-options reportDir=reports,reportFilename=${FOLDER}_result,quiet=true"
  }

# then run testcases   
npm run test:all
npm run test:seven
# or run per folder
$env:FOLDER="SevenCharVal"; npm run test:folder

