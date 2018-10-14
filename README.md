# Axway Appcelerator socket.io demo app + node.js server

Just a basic socket.io chat app and a node.js socket server.

## How to run

* clone the repo
* import the project: `appc new --import --no-services`
* run the socket.io server: `cd socketServer && npm install && node server.js`
* open "http://127.0.0.1:8080"
* change the `SERVER_IP` inside the index.js controller
* compile and run the app: `appc ti build -p android  -T device`

## Features

* connect / disconnect to socket.io server
* send / receive messages
* get client count
* get last five messages
