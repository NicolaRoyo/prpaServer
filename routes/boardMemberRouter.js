const express = require('express');
const BoardMember = require('../models/boardMember')

const boardMemberRouter = express.Router();

boardMemberRouter.route('/')
.get((req, res) => {
    BoardMember.find()
    .then(boardMembers => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(boardMembers);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    BoardMember.create(req.body)
    .then(boardMember => {
        console.log('Board Member Added', boardMember);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(boardMember);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /boardmembers');
})
.delete((req, res, next) => {
    BoardMember.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

boardMemberRouter.route('/:boardMemberId')
.get((req, res, next) => {
    BoardMember.findById(req.params.boardMemberId)
    .then(boardMember => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(boardMember);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /boardmembers/${req.params.boardMemberId}`);
})
.put((req, res, next) => {
    BoardMember.findByIdAndUpdate(req.params.boardMemberId, {
        $set: req.body
    }, { new: true })
    .then(boardMember => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(boardMember);
    })
    .catch(err => next(err));
})
.delete((req, res) => {
    res.end(`Deleting board member: ${req.params.boardMemberId}`);
});

module.exports = boardMemberRouter;