const express = require('express');
const Partnership = require('../models/partnership');

const partnershipRouter = express.Router();

partnershipRouter.route('/')
.get((req, res, next) => {
    Partnership.find()
    .then(partnerships => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partnerships);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Partnership.create(req.body)
    .then(partnership => {
        console.log('Partnership Created ', partnership);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partnership);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partnerships');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Partnership.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

partnershipRouter.route('/:partnershipId')
.get((req, res, next) => {
    Partnership.findById(req.params.partnershipId)
    .then(partnership => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partnership);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partnerships/${req.params.partnershipId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Partnership.findByIdAndUpdate(req.params.partnershipId, {
        $set: req.body
    }, { new: true })
    .then(partnership => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partnership);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, (req, res) => {
    res.end(`Deleting partnership: ${req.params.partnershipId}`);
});

module.exports = partnershipRouter;