const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllActors = async (req, res) => {
    //#swagger.tags=['actors']
    try {
        const result = await mongodb.getDatabase().db().collection('actors').find();
        const actors = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching actors' });
    }
};

const getSingleActor = async (req, res) => {
    //#swagger.tags=['actors']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid actor ID' });
    }
    try {
        const actorId = new ObjectId(req.params.id);
        const actor = await mongodb.getDatabase().db().collection('actors').findOne({ _id: actorId });
        if (!actor) return res.status(404).json({ error: 'Actor not found' });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createActor = async (req, res) => {
    //#swagger.tags=['actors']
    const actor = {
        name: req.body.name,
        birthYear: parseInt(req.body.birthYear),
        nationality: req.body.nationality,
        movies: req.body.movies // should be an array of movie titles or IDs
    };
    try {
        const result = await mongodb.getDatabase().db().collection('actors').insertOne(actor);
        res.status(201).json({ message: 'Actor created', actorId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateActor = async (req, res) => {
    //#swagger.tags=['actors']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid actor ID' });
    }
    const actorId = new ObjectId(req.params.id);
    const actor = {
        name: req.body.name,
        birthYear: parseInt(req.body.birthYear),
        nationality: req.body.nationality,
        movies: req.body.movies
    };
    try {
        const result = await mongodb.getDatabase().db().collection('actors').replaceOne({ _id: actorId }, actor);
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Actor updated successfully' });
        } else {
            res.status(404).json({ error: 'Actor not found or unchanged' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteActor = async (req, res) => {
    //#swagger.tags=['actors']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid actor ID' });
    }
    try {
        const actorId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('actors').deleteOne({ _id: actorId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Actor deleted' });
        } else {
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllActors,
    getSingleActor,
    createActor,
    updateActor,
    deleteActor
};
