const express = require('express');
const path = require('path');
// have express create the server
const app = express();
// variable that stores the port number
const port =3000;


// allow the server to accept request

// tells express to automatacly understasnd json
app.use(express.json())
app.use(express.static(path.join(__dirname)))

//  routes 
//  react . the routes are stored in its own folder in the backend. this is how you retrive the data from your aoi eendpoints.
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/books', async (req, res)=>{
    // read what the user types
    const query = req.query.q;
// if no query is typed then we send a 400 error
    if(!query){
        return res.status(400).json({error: 'you must enter a title or author'});
    }

     const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

    //  goal: Retrive a book
     try{
        // create a variable to hod the responsr
        const response = await fetch(url);
        const data = await response.json();
        const books = data.docs.slice(0, 10).map(book =>({
            title: book.title,
            author: book.author_name?.[0] ?? 'uknown',
            year: book.first_published_year ?? '?'
    
        }));
        res.json({books});


     }catch(err) {
        res.status(500).json({error: 'server error', details: err.message});


     }
});

// actually start the server

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});