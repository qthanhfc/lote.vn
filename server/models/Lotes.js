const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoteSchema = new Schema({
    mb_prize_1_item_0: {
        type: Number,
        require: true,
    },
    mb_prize_2_item_0: {
        type: Number,
        require: true,
    },
    mb_prize_2_item_1: {
        type: Number,
        require: true,
    },
    mb_prize_3_item_0: {
        type: Number,
        require: true,
    },
    mb_prize_3_item_1: {
        type: Number,
        require: true,
    },
    mb_prize_3_item_2: {
        type: Number,
        require: true,
    },
    mb_prize_3_item_3: {
        type: Number,
        require: true,
    },
    mb_prize_3_item_4: {
        type: Number,
        require: true,
    },
    mb_prize_3_item_5: {
        type: Number,
        require: true,
    },
    mb_prize_4_item_0: {
        type: Number,
        require: true,
    },
    mb_prize_4_item_1: {
        type: Number,
        require: true,
    },
    mb_prize_4_item_2: {
        type: Number,
        require: true,
    },
    mb_prize_4_item_3: {
        type: Number,
        require: true,
    },
    mb_prize_5_item_0: {
        type: Number,
        require: true,
    },
    mb_prize_5_item_1: {
        type: Number,
        require: true,
    },
    mb_prize_5_item_2: {
        type: Number,
        require: true,
    },
    mb_prize_5_item_3: {
        type: Number,
        require: true,
    },
    mb_prize_5_item_4: {
        type: Number,
        require: true,
    },
    mb_prize_5_item_5: {
        type: Number,
        require: true,
    },
    mb_prize_6_item_0: {
        type: Number,
        require: true,
    },
    mb_prize_6_item_1: {
        type: Number,
        require: true,
    },
    mb_prize_6_item_2: {
        type: Number,
        require: true,
    },
    mb_prize_7_item_0: {
        type: Number,
        require: true,
    },
    mb_prize_7_item_1: {
        type: Number,
        require: true,
    },
    mb_prize_7_item_2: {
        type: Number,
        require: true,
    },
    mb_prize_7_item_3: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('lotes', LoteSchema);
