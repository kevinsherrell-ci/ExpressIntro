const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

let favoriteMovieList = ["Star Wars", "The Avengers"];
let movieString = favoriteMovieList.join(" ");

let favoriteMovies = [
    {
        title: "Star Wars",
        starRating: 5,
        isRecommended: true,
        createdAt: Date.now(),
        lastModified: Date.now()
    },
    {
        title: "The Avengers",
        starRating: 5,
        isRecommended: true,
        createdAt: Date.now(),
        lastModified: Date.now()
    }
]

app.use(bodyParser.json());
app.get('/', (req, res)=>{
    res.send({
        name: "Kevin Sherrell",
        date: new Date(),
    });
})
app.post('/new-movie', (req, res)=>{
    // validate if the req.body exists and is not empty\
    const movie = {}
    if(req.body.title && req.body.isRecommended && req.body.starRating){
        movie.title = req.body.title;
        movie.starRating = req.body.starRating;
        movie.isRecommended = req.body.isRecommended;
        movie.createdAt = Date.now();
        movie.lastModified = Date.now();
    }else{
        throw "req.body is not correct";
    }

    try{
        favoriteMovies.push(movie);
        res.status(200).send(favoriteMovies);
    }catch(err){
        res.status(500).send(err.message);
    }

})
app.get("/all-movies", (req, res)=>{
    let movieList = favoriteMovieList.join(" ");
    res.status(200).send(movieList);
})
app.get('/list-movies', (req, res)=>{
    console.log(movieString);
    res.send(movieString);
})
app.get('/add-movie', (req, res)=>{
    favoriteMovieList.push(req.query);
    res.redirect('/list-movies');
})
app.put("/update-movie/:titleToUpdate", (req, res)=>{
    const titleToUpdate = req.params.titleToUpdate;
    // update movie by title
})
app.delete("/delete-movie/:titleToDelete", (req, res)=>{
    const titleToDelete = req.params.titleToDelete;
    // delete movie by title
})
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})
