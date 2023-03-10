const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;