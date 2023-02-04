// sort out event/directory and outreach wording to sync with 

const express = require('express');
const { events } = require('../models/event');
const Event = require('../models/event');


const directoryRouter = express.Router();

directoryRouter.route('/')
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
.post((req, res, next) => {
    Event.create(req.body)
    .then(event => {
        console.log('Event Created ', event);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /directory');
})
.delete((req, res, next) => {
    Event.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//will add other types of events besides the outreach 
directoryRouter.route('/directory/:eventOutreachId')
.get((req, res, next) => {
    Event.findById(req.params.eventOutreachId)
    .then(event => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /directory/${req.params.eventOutreachId}`);
})
.put((req, res, next) => {
    Event.findByIdAndUpdate(req.params.eventOutreachId, {
        $set: req.body
    }, { new: true })
    .then(event => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    })
    .catch(err => next(err));
})
.delete((req, res) => {
    res.end(`Deleting event: ${req.params.eventOutreachId}`);
});

module.exports = directoryRouter;