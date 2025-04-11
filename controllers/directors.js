const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['directors']
    try {
        const result = await mongodb.getDatabase().db().collection('directors').find();
        const directors = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while fetching directors.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['directors']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid director ID to find one.');
    }
    try {
        const directorId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('directors').findOne({ _id: directorId });
        if (!result) {
            return res.status(404).json({ error: 'Director not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message || 'An error occurred while fetching the director.' });
    }
};

const createDirector = async (req, res) => {
    //#swagger.tags=['directors']
    const director = {
        name: req.body.name,
        birthYear: parseInt(req.body.birthYear, 10),
        nationality: req.body.nationality,
        awards: req.body.awards, // assumed array of strings
        activeYears: req.body.activeYears,
        genres: req.body.genres, // assumed array of strings
        notableWorks: req.body.notableWorks // assumed array of strings
    };
    try {
        const response = await mongodb.getDatabase().db().collection('directors').insertOne(director);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Director created successfully', directorId: response.insertedId });
        } else {
            res.status(500).json({ error: 'An error occurred while adding the director' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while adding the director.' });
    }
};

const updateDirector = async (req, res) => {
    //#swagger.tags=['directors']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid director id to update one.' });
    }
    const directorId = new ObjectId(req.params.id);
    const director = {
        name: req.body.name,
        birthYear: parseInt(req.body.birthYear, 10),
        nationality: req.body.nationality,
        awards: req.body.awards,
        activeYears: req.body.activeYears,
        genres: req.body.genres,
        notableWorks: req.body.notableWorks
    };
    try {
        const response = await mongodb.getDatabase().db().collection('directors').replaceOne({ _id: directorId }, director);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Director updated successfully' });
        } else {
            res.status(404).json({ error: 'Director not found or no changes made.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while updating the director.' });
    }
};

const deleteDirector = async (req, res) => {
    //#swagger.tags=['directors']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid director id to delete one.');
    }
    try {
        const directorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('directors').deleteOne({ _id: directorId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: 'Director deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Director not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || 'An error occurred while deleting the director.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createDirector,
    updateDirector,
    deleteDirector
};