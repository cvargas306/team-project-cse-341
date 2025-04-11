const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['movies']
    try {
        const result = await mongodb.getDatabase().db().collection('movies').find();
        const movies = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while fetching movies.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['movies']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid movie ID to find one.');
    }
    try {
        const movieId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('movies').findOne({ _id: movieId });
        if (!result) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message || 'An error occurred while fetching the movie.' });
    }
};

const createMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movie = {
        title: req.body.title,
        releaseYear: parseInt(req.body.releaseYear, 10),
        genre: req.body.genre,
        duration: req.body.duration,
        rating: req.body.rating,
        synopsis: req.body.synopsis,
        directorId: new ObjectId(req.body.directorId) // assumes front-end sends director _id
    };
    try {
        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Movie created successfully', movieId: response.insertedId });
        } else {
            res.status(500).json({ error: 'An error occurred while adding the movie' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while adding the movie.' });
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['movies']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid movie id to update one.' });
    }
    const movieId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        releaseYear: parseInt(req.body.releaseYear, 10),
        genre: req.body.genre,
        duration: req.body.duration,
        rating: req.body.rating,
        synopsis: req.body.synopsis,
        directorId: new ObjectId(req.body.directorId)
    };
    try {
        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Movie updated successfully' });
        } else {
            res.status(404).json({ error: 'Movie not found or no changes made.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while updating the movie.' });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['movies']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid movie id to delete one.');
    }
    try {
        const movieId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: 'Movie deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || 'An error occurred while deleting the movie.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
};