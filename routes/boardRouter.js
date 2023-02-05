const express = require('express');
const boardRouter = express.Router();

boardRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send the names of the board members to you');
})
.post((req, res) => {
    res.end(`Will add the board member named: ${req.body.name} with the title of: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /boardmembers');
})
.delete((req, res) => {
    res.end('Deleting all board members');
});


boardRouter.route('/:boardId')
.get((req, res) => {
    res.end(`Will send details of the board member named: ${req.params.boardId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /boardmembers/${req.params.boardId}`);
})
.put((req, res) => {
    res.write(`Updating the board member: ${req.params.boardId}\n`);
    res.end(`Will update the board member: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting board member: ${req.params.boardId}`);
});

module.exports = boardRouter;