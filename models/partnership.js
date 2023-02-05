const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
});

const Partnership = mongoose.model('Partnership', partnershipSchema);

module.exports = Partnership;