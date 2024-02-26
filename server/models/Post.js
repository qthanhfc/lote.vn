const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    numberCount: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        // new Date().toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"})
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = mongoose.model('posts', PostSchema);
