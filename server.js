const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

// express middleware function to handle parsing json data into javascript properties of the request object
app.use(express.json());

// app.all - routing method that's a catch-all for all http verbs
// like all routing methods it takes a path as the first parameter '/campsites'
// any http request to this path will trigger this method
// 2nd parameter pass in a callback function (req,res,next) =>and set a response statusCode...
// then call the next() function which will pass control of the application routing to the next relevant routing method
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');  //send back plain text in the response body
    next();
});


// next routing method set up an endpoint for a get request to the path '/campsites'
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

 
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

//reject the request to this endpoint - operation is not supported
app.put('/campsites', (req, res) => {
    res.statusCode = 403;  //error code 403 operation not supported
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});


// 4 more endpoints that support a different path, route parameter added :campsiteId
// this allows us to store whatever the client sends as the part of the path after the /

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

//post request not supported on this path - but send message back
app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

// send a multi-line response res.write \n res.end
app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

//endpoint is used for deleting a specific campsite
app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public'));


app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});