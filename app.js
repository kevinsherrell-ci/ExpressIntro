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

app.put("/update-movie/:titleToUpdate", (req, res)=>{
    let titleToUpdate;
    if(req.params.titleToUpdate){
        titleToUpdate = req.params.titleToUpdate;
    }else{
        throw "Must provide a title to update";
    }
    try{
        const found = favoriteMovies.find(movie=>movie.title ===  titleToUpdate);
        // iterate through each field of the object and replace the value if there is a new value
        Object.keys(found).forEach(key=>{
            if(Object.keys(req.body).includes(key) && found[key] !== req.body[key]){
                found[key] = req.body[key];
                found.lastModified = Date.now();
            }
        })
        res.send(favoriteMovies);
    }catch(err){
        res.status(500).send(err.message);
    }

})
app.get("/single-movie/:titleToFind", (req, res)=>{
    let titleToFind;
    if(req.params.titleToFind){
        titleToFind = req.params.titleToFind;
    }else{
        throw "must provide a title";
    }
    try{
        const found = favoriteMovies.find(movie=>movie.title === titleToFind);
        console.log(found);
        if(found === null || found === undefined){
            res.status(400).send("Movie not found");
        }else{
            res.status(200).send(found);
        }
    }catch(err){
        res.status(50).send(err.message);
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

app.delete("/delete-movie/:titleToDelete", (req, res)=>{
    let titleToDelete;
    if(req.params.titleToDelete){
        titleToDelete = req.params.titleToDelete;
    }else{
        throw "Must provide a title to delete";
    }
    try{
        const found = favoriteMovies.findIndex(movie=>movie.title === titleToDelete);
        res.status(200).send(favoriteMovies.splice(found, 1));
        console.log(favoriteMovies);
    }catch(err){
        res.status(500).send(err.message);
    }

    // delete movie by title
})
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})
