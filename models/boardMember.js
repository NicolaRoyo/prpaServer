const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardMemberSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
});

const BoardMember = mongoose.model('BoardMember', boardMemberSchema);

module.exports = BoardMember;