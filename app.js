const express = require('express');
const app = express();
const port = 3000;

const favoriteMovieList = ["Star Wars", "The Avengers"];
const movieString = favoriteMovieList[0]+ favoriteMovieList[1];
app.get('/', (req, res)=>{
    res.send({
        name: "Kevin Sherrell",
        date: new Date(),
    });
})
app.get('/list-movies', (req, res)=>{
    res.send(movieString);
})
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})
