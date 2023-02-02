const express = require('express');
const boardRouter = express.Router();

boardRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partnerships to you');
})
.post((req, res) => {
    res.end(`Will add the partnership: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partnerships');
})
.delete((req, res) => {
    res.end('Deleting all partnerships');
});


partnershipRouter.route('/partnerships/:partnershipId')
.get((req, res) => {
    res.end(`Will send details of the partnership: ${req.params.partnershipId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partnerships/${req.params.partnershipId}`);
})
.put((req, res) => {
    res.write(`Updating the partnership: ${req.params.partnershipId}\n`);
    res.end(`Will update the partnership: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting partnership: ${req.params.partnershipId}`);
});

module.exports = partnershipRouter;