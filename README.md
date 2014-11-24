How to build

Pixi Magazine is build on top of [static server](https://github.com/juliocanares/static-server) that run
an node.js server to serve the application.

You need to have [node.js and npm](https://nodejs.org/en/) installed to run the project also you need
[grunt.js](http://gruntjs.com/)  to run the tasks , we you are already go to install all the dependencies
running.

```sudo npm install```

Now you need to run grunt, just go to root of the project and run

``` grunt ```

Then, you will be able to run the server with the next command 

```node server.js```

By default you need to go to http://127.0.0.1:3000 but you can pass an specific port running.

```PORT=8080 node server.js```