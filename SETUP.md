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

