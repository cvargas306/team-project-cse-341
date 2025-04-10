const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['directors']
    const result = await mongodb.getDatabase().db().collection('directors').find();
    result.toArray().then((directors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(directors);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['directors']
    const directorId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('directors').find({ _id: directorId });
    result.toArray().then((directors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(directors[0]);
    });
};

const createDirector = async (req, res) => {
    //#swagger.tags=['directors']
    const director = {
        name: req.body.name,
        birthYear: req.body.birthYear,
        nationality: req.body.nationality,
        awards: req.body.awards,
        activeYears: req.body.activeYears,
        genres: req.body.genres,
        notableWorks: req.body.notableWorks
    };
    const response = await mongodb.getDatabase().db().collection('directors').insertOne(director);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while adding the director');
    }
};

const updateDirector = async (req, res) => {
    //#swagger.tags=['directors']
    const directorId = new ObjectId(req.params.id);
    const director = {
        name: req.body.name,
        birthYear: req.body.birthYear,
        nationality: req.body.nationality,
        awards: req.body.awards,
        activeYears: req.body.activeYears,
        genres: req.body.genres,
        notableWorks: req.body.notableWorks
    };
    const response = await mongodb.getDatabase().db().collection('directors').replaceOne({ _id: directorId }, director);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the director');
    }
};

const deleteDirector = async (req, res) => {
    //#swagger.tags=['directors']
    const directorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('directors').deleteOne({ _id: directorId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the director');
    }
};

module.exports = {
    getAll,
    getSingle,
    createDirector,
    updateDirector,
    deleteDirector
};