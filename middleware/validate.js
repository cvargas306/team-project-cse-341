const validator = require('../helpers/validate');

const saveDirector = (req, res, next) => {
    console.log("Received director body:", req.body);
    const isUpdate = req.method === 'PUT';

    const validationRule = {
        name: isUpdate ? 'string' : 'required|string',
        birthYear: isUpdate ? 'numeric' : 'required|numeric',
        nationality: isUpdate ? 'string' : 'required|string',
        awards: 'array',
        activeYears: isUpdate ? 'string' : 'required|string',
        genres: 'array',
        notableWorks: 'array'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveMovie = (req, res, next) => {
    console.log("Received movie body:", req.body);
    const isUpdate = req.method === 'PUT';

    const validationRule = {
        title: isUpdate ? 'string' : 'required|string',
        releaseYear: isUpdate ? 'numeric' : 'required|numeric',
        genre: isUpdate ? 'string' : 'required|string',
        rating: isUpdate ? 'numeric' : 'required|numeric', 
        duration: isUpdate ? 'numeric' : 'required|numeric',
        mainActor: isUpdate ? 'string' : 'required|string',
        directorName: isUpdate ? 'string' : 'required|string' 
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveActor = (req, res, next) => {
    console.log("Received actor body:", req.body);
    const isUpdate = req.method === 'PUT';

    const validationRule = {
        name: isUpdate ? 'string' : 'required|string',
        birthYear: isUpdate ? 'numeric' : 'required|numeric',
        nationality: isUpdate ? 'string' : 'required|string',
        movies: 'array' 
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveUser = (req, res, next) => {
    console.log("Received user body:", req.body);
    const isUpdate = req.method === 'PUT';

    const validationRule = {
        username: isUpdate ? 'string' : 'required|string',
        email: isUpdate ? 'email' : 'required|email',
        password: isUpdate ? 'string' : 'required|string|min:6',
        role: isUpdate ? 'string' : 'required|string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveDirector,
    saveMovie,
    saveActor,
    saveUser
};
