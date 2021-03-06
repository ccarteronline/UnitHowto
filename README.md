# Contructing Unit Tests

Unit tests are essential for the [Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development)  way of building out your application. Unit tests help developers to test individual bits and pieces of code that allow the dev to code "better" than without testing. This document will explain the steps to running unit tests for individual controllers. There are many ways to do unit tests. This document will cover the basics including setting up a coverage reporter.

### Things we will need:

 In order to run unit tests, you should have a basic understanding of how to set up your project including how to get a Node server running and to point your `index.html` file and its scripts to the right location. We will be using: [Bower](http://bower.io/), [Karma](http://karma-runner.github.io/) & [Karma Coverage](http://karma-runner.github.io/0.8/config/coverage.html) and the [Jasmine](http://jasmine.github.io/) framework for getting simple assertion situations going. We are obviously going to need [Angular](https://angularjs.org/) and also [Angular Mocks](https://github.com/angular/bower-angular-mocks).

### Project Setup:
  ##### Create and Modify package.json
  We need to setup our `package.json` file. It will sit in the root directory of our project. It should look like this in the beginning:
  >```
  {
      "name": "UnitTests",
      "version": "0.0.1",
      "description": "An example of how to run unit tests",
      "author": "Chris Carter"
  }
  ```

  Now we need to install our dependencies. Run the following commands to install the dependencies mentioned.
  > `npm install --save bower`

  > `npm install karma --save-dev`

  > `npm install karma-coverage --save-dev`

  Great! Now we should have all the dependencies that we need to create our unit tests. Your `package.json` file should now resemble something like this:

  >```
  {
    "name": "UnitTests",
    "version": "0.0.1",
    "author": "Chris Carter",
    "description" : "An example of how to run unit tests",
    "dependencies": {
      "bower": "^1.5.2",
      "express": "^4.13.3",
      "moment": "^2.10.6",
      "nodemon": "^1.4.1"
    },
    "devDependencies": {
      "karma": "^0.13.9",
      "karma-coverage": "^0.5.1"
    }
  }
```

I have some extra dependencies in there to run my application but overall, you should see the ones we need in our application. Save that file and lets now move onto the next step

 ##### Create and Modify bower.json
 We need to set up our `bower.json` file in order to user bower as our other package manager. This is an optional as it is also possible to just stick with NPM. However, bower is what will be used in this tutorial. Lets begin by running the following steps:
 > `bower init`

 This command will create a `bower.json` file in the root directory of our application. This is essential for adding and automating our other bower dependencies. Follow the steps the place in the name, version, description etc. Be sure to select node as your modules when it asks you which package to expose. Enter keywords, authors and email addreses. There are other options like MIT license, homepage, etc. Usually you can just press `enter` to continue to go through the as it will create default settings. If you have any questions or need further clarification on what options to choose, here is a link to provide [further reading](http://bower.io/docs/creating-packages/#bowerjson).

 Next we will need to set up our bower dependcies. In this particular case we will need: AngularJS and Angular Mocks. So lets run the following command:
 > `bower install --save angular && bower install --save angular-mocks`

 This will place angular and the mocks into our `bower.json` dependencies so that we can consume them in our `index.html` file. You should now have a `bower.json` file that resembles this:
 >```
 {
  "name": "Unit Tests",
  "version": "0.0.1",
  "authors": [
    "Chris Carter <chris@ccarteronline.com>"
  ],
  "description": "Just to test out unit tests",
  "main": "main.js",
  "keywords": [
    "unit",
    "test"
  ],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "angular": "~1.4.5",
    "angular-mocks": "~1.4.5"
  }
}
```

##### Create and Modify index.html
Now we need to setup our index.html file. Just to make sure that we have the right dependencies lets run:
`npm install && bower install`

Now we should have a `bower_components` directory and a `node_modules` directory in the root of our application.
Go ahead and create an `index.html` file it should include angular and angular mocks in the head of the document like this:

>```
<!DOCTYPE html>
<html ng-app="sampleApp">
<head>
    <title>My Unit tests</title>
    <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
    <script type="text/javascript" src="bower_components/angular-mocks/angular-mocks.js"></script>
</head>
<body>
</body>
</html>
```

### Prepping a Test
Now that we have our `index.html` file set up. Its time to write some tests. Notice that we have placed `ng-app="sampleApp"` inside the `<html>` tag declaration. This is so that angular knows that we are working with this particular application is is needed for when we create our module to do tests and everything else involved with angular.

Take a look at our directory stucture here:
>```
|-- Unit Test Project
|      |bower_components
|      |-- bower.json
|      |coverage
|      |-- index.html
|      |js
|      |  |--app.js
|      |  |controllers
|      |  |   |--sampleCtrl.js
|      |  |tests
|      |  |   |--sampleCtrlSpec.js
|      |-- karma.config.js
|      |-- main.js
|      |node_modules
|      |-- package.json
```

#### Karma config
Now we need to create the `karma.config.js` file that is sitting in our main directory. We can do this manually or automate it bit running:
`karma init karma.config.js` You could also just copy the code below and paste it into your own file. Remember to save it in its proper place in the directory. Here is the following code.

```
// Karma configuration
// Generated on Mon Aug 31 2015 13:27:53 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'js/app.js',
        'js/controllers/*.js',
        'js/tests/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'js/controllers/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type: 'html',
        dir: 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    CaptureTimeout: 60000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
```

Take a look at the files object in the `karma.config.js` file. It lists what to load in the browser. We need our `bower_components` folder that loads Angular and Angular mocks. We also need to load in our main app.js and then all the controllers and all the Spec files which will be our actual unit tests.

Now look at the preprocessors object. We are telling it to look for coverage in the all the controllers. This helps us for pulling up the coverage reporter to see if we are testing the right scobe methods and properties.

### Writing a Test

After everything is set up. Its time to write a simple test. Lets create build something here in our `index.html` file.

####index.html

>```
<!DOCTYPE html>
<html ng-app="sampleApp">
<head>
    <title>My Unit tests</title>
    <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
    <script type="text/javascript" src="bower_components/angular-mocks/angular-mocks.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/controllers/sampleCtrl.js"></script>
</head>
<body>
    Welcome to my unit test example
    <div ng-controller="SampleCtrl">
        <span>{{ hello }}</span>
        <p>{{ message }}</p>
        <a href="#" ng-click="awesomeMethod()">Test Link</a>
        <div>
            <h3>Display Clicked Result</h3>
            <p>{{ clickedResult }}</p>
        </div>
    </div>
</body>
</html>
```

We have added in a controller. It is called: `SampleCtrl` Take a look at it: `<div ng-controller="SampleCtrl">` SampleCtrl is what we will be testing in our unit tests. Just think of unit test as always testing out the items and bits of code within a controller and in our case, it will be: SampleCtrl.

Within this controller, we have scope variables that we are calling in with the mustache brackets: `{{ aVariable }}`

In this controller we want to test that we can display the hello variable. We also want to test that when we click on the link, the displayed clicked result variable will be there for us. More importantly is the thought process about your methods and your properties or your `scope.variable` and `scope.method()` these items need to be tested to make sure that they are doing what they are suppose to. Once you have your items in the controller of your `index.html` file, its time to start to write our `sampleCtrl.js` file and out `app.js` file.

Within our `app.js` file, all we need to do is define our module. Remember when we told our app what is was in the `index.html` file? We stated: `<html ng-app="sampleApp">`

This means that now we have to carry this over in our controllers and every other portion that Angular handles when we need to do more javascript like code before sending it to our view.



####app.js

```angular.module('sampleApp', []);```

At this moment, all we need is just this line of code in our `app.js` file. We could place it in our controllers but abstracting it out a bit more is efficient so that we can make our code more reusable. Be sure to include the correct path for it to be loaded in correctly. `/js/app.js`



####sampleCtrl.js

Here we will create the controller that will do the work for our hello to be displayed and the clicking of the links to show our result. Take a look below.

```
angular.module('sampleApp').controller('SampleCtrl', ['$scope', function ($scope) {
    $scope.hello = 'Hello Chris';
    $scope.message = 'This is the message that I have here right now';
    $scope.clickedResult = 'Click to see';
    $scope.awesomeMethod = function () {
        //do something
        var _el = this;
        var testNum = 4927;
        var equation = (13 * 379);
        $scope.clickedResult = ('YOU CLICKED! Results: ' + equation);
    };
}]);
```

`$scope.hello` is to the `{{ hello }}` that we have inside our `index.html` page.

`$scope.message` is to the `{{ message }}` variable that we placed inside our `index.html` page.

`$scope.awesomeMethod = function () {};` is a scope method that "does something." it creates a simple math equation which then sets the `$scope.clickedResult` to include that value. Once it is set, it will display the results.

####sampleCtrlSpec.js
This is the file where we do the actual unit tests for the controller. Be sure that it is in the proper directory: `/js/tests/sampleCtrlSpec.js` Here is what it should look like:

```
'use strict';

describe('Testing the test controller: SampleCtrl', function () {
    beforeEach(module('sampleApp'));

    var sampleCtrl, scope;

    beforeEach(inject(function ($controller, $rootScope){
        scope = $rootScope;
        sampleCtrl = $controller('SampleCtrl', {
            $scope: scope
        });
    }));

    it('should say hello', function () {
        expect(scope.hello).toBe('Hello');
    });

    it('should change content when clicked', function () {
        var defautRes = 'Click to see';
        scope.awesomeMethod();
        expect(scope.clickedResult).toBe('something');
    });
});
```
Lets walk through this a bit. We are telling this code to be used in strict mode. In this mode, you cannot use undeclared variables.

The `describe()` statement is what we want to tell our test it is about to do. In this case, we are `"Testing the test controller: SampleCtrl"`

Within the describe statement we have to state: `beforeEach()` so that means get the module that we are using which is: `module('sampleApp')`

The next thing we need to do is declare the variables that we will be using. We have to literally bring in the scope of our application and set it to be used for our tests so lets create:

`var sampleCtrl, scope;`

Next, lets inject the another `beforeEach()` statement. This will happen with every assertion or `it()` declaration. So we will bascially say: "Before each test, bring in or inject the controller and scope itself" so that we can use those elements for the test.

Next we have our assertion.

```
it('should say hello', function () {
  expect(scope.hello).toBe('Hello');
});
```
This tells our test that we expect the variable `scope.hello` to be hello. Lets run our test to see that this is true.

Lets go to the terminal where our app is running and start the application with running the command:

`karma start karma.config.js`

![alt tag](img/failTest.png)

If you have ran the test successfully, you should see a browser window show up and it will display that your tests have failed. This is actually good, and the point of unit tests. Our test and the actual value of the scope methods within our controllers do not match, so our unit tests fail. Let's go ahead and fix them. Take a look at what is expected and then we can replace those values inside our spec.

Take a look at the error and find the line number upon which you should see the particular part in the code that will need to be changed. Run your command again `karma start karma.config.js` and see that the tests now pass!

![alt tag](img/success.png)

Congradulations you can now write a simple unit test! Apply this concept to even the most advance and complex unit tests. This is a general understanding. There are many other points to consider including testing services that get and send data and making sure that they perform properly. More to come!