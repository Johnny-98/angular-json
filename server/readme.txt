1-Microservice
    To create a microservice that processes the data from the data.json
    and returns it in response to HTTP requests, I use Node.js and Express. 
    This microservice will expose an endpoint to fetch property 
    details based on the query parameter I give it.


2 - How server works
    Both the Server and the Microservice should run for the application to function correctly.
    Main Server (index.js): This file is for the main Express server, handling /data and managing the socket connections.
    Microservice (server.js): This separate file is specifically for the microservice that handles the /property-details endpoint.
    This microservice runs independently from the main server on a different port. 


3 - How to run
    To run both:
    For the Server: Navigate to the directory containing index.js and run npm start
    For the Microservice: Navigate to server.js run node server.js or npm start.

4 -Libraries explained

    cors
        The CORS (Cross-Origin Resource Sharing) library is a set of mechanisms implemented in web browsers to control and manage requests made from one domain (origin)
        to another domain. CORS is a security feature designed to prevent unauthorized access to resources on a different domain, thus helping protect web applications 
        from potential security vulnerabilities.

        When the Angular app (running on http://127.0.0.1:4200) tries to make a request to the microservice (running on http://localhost:4000) it is blocked because
        these are considered different origins, and the microservice does not explicitly allow such cross-origin requests.

        The CORS library helps in defining and handling HTTP headers that allow servers to specify which origins are permitted to access their resources.


    express
        Express allows you to define middleware functions that can be used to intercept and process incoming HTTP requests and outgoing responses. 
        Middleware functions are executed in the order they are defined
        CORS Middleware: It allows cross-origin requests to be made to the server, effectively permitting requests from different domains to access the server's resources. 
        Socket.IO Connection and Integration:  Initializing Socket.IO and allows WebSocket connections
        Server Start: you can customize the command for starting the server


    socket.io
        Real-time bidirectional communication between the server and clients using events.
        Clients can emit events to the server, and the server can emit events to clients.
        Handles reconnections automatically, making it resilient to network interruptions.