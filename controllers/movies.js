const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['movies']
    const result = await mongodb.getDatabase().db().collection('movies').find();
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['movies']
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    });
};

const createMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movie = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while adding the movie');
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movieId = new ObjectId(req.params.id);
    const movie = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the movie');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the movie');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
};