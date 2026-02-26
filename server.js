const express = require('express');
const fetch = require('node-fetch');
// have express create the server
const app = express();
// variable that stores the port number
const port =3000;


// allow the server to accept request

// tells express to automatacly understasnd json
app.use(express.json());

//  routes 
//  react . the routes are stored in its own folder in the backend. this is how you retrive the data from your aoi eendpoints.
app.get('/books', async (req, res)=>{
    
})