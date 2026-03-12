# Project Setup Commands

The following commands were used to create and initialize this project folder:

```bash
# create project directory (already existing)
mkdir SE_Webdriver_26
cd SE_Webdriver_26

# initialize npm project
#touch package.json # or npm init -y
npm init -y

# install dependencies (example, if any)
npm install selenium-webdrive
npm install --save-dev mocha chai 
npm install chromedriver
## for html reports
npm install --save-dev mochawesome
##for running & saving reports per folder
npm install --save-dev cross-env


# create test and reports directories
mkdir test
mkdir reports

# add test and page object files
# e.g. create SevenCharValPage.js and dd_SevenChar_test.js
# add testcase JSON
# these files were manually created with respective contents

# optional: running tests
# in package.json edit script line
"scripts": {
    "test:all": "mocha --recursive --reporter mochawesome --reporter-options reportDir=reports,reportFilename=full_suite_result,quiet=true",
  "test:seven": "mocha test/SevenCharVal --reporter mochawesome --reporter-options reportDir=reports,reportFilename=SevenCharVal_result,quiet=true",
    "test:folder": "cross-env-shell mocha test/$FOLDER --reporter mochawesome --reporter-options reportDir=reports,reportFilename=${FOLDER}_result,quiet=true"
  }

#then run testcases   
npm run test:all
npm run test:seven
#or run per folder
$env:FOLDER="SevenCharVal"; npm run test:folder
```

