// sort out event/directory and outreach wording to sync with 

const express = require('express');
const Event = require('../models/event');
const authenticate = require('../authenticate');

const eventRouter = express.Router();

eventRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
.get((req, res, next) => {
    Event.find()
    .then(events => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(events);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Event.create(req.body)
    .then(event => {
        console.log('Event Created ', event);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /events');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Event.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//will add other types of events besides the outreach 
eventRouter.route('/:eventId')
.get((req, res, next) => {
    Event.findById(req.params.eventId)
    .then(event => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /event/${req.params.eventId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Event.findByIdAndUpdate(req.params.eventId, {
        $set: req.body
    }, { new: true })
    .then(event => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, (req, res) => {
    res.end(`Deleting event: ${req.params.eventId}`);
});

module.exports = eventRouter;