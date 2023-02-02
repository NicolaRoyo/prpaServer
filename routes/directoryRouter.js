const express = require('express');
const directoryRouter = express.Router();

directoryRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the events to you');
})
.post((req, res) => {
    res.end(`Will add the event: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /directory');
})
.delete((req, res) => {
    res.end('Deleting all events');
});


directoryRouter.route('/directory/:outreachId')
app.get('/directory/:outreachId', (req, res) => {
    res.end(`Will send details of the event: ${req.params.outreachId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /directory/${req.params.outreachId}`);
})
.put((req, res) => {
    res.write(`Updating the event: ${req.params.outreachId}\n`);
    res.end(`Will update the event: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting event: ${req.params.outreachId}`);
});

module.exports = directoryRouter;