const express = require('express');
const router = express.Router();
require('dotenv').config();
const cors = require('cors');

const Lotes = require('../models/Lotes');

const fs = require('fs'); // require thêm module filesystem

const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require('request-promise');

const URL = 'https://xosodaiphat.com/';

const getPageContent = (uri) => {
    const options = {
        uri,
        headers: {
            'User-Agent': 'Request-Promise',
        },
        transform: (body) => {
            return cheerio.load(body);
        },
    };
    return request(options);
};

getPageContent(`${URL}`).then(($) => {
    console.log($('#mb_prize_DB_item_0').text());
});

const htmlToLotes = ($) => {
    const lotes = [];
    const mb_prize_DB_item_0 = $('#mb_prize_DB_item_0').text();

    const mb_prize_1_item_0 = $('#mb_prize_1_item_0').text();

    const mb_prize_2_item_0 = $('#mb_prize_2_item_0').text();
    const mb_prize_2_item_1 = $('#mb_prize_2_item_1').text();

    const mb_prize_3_item_0 = $('#mb_prize_3_item_0').text();
    const mb_prize_3_item_1 = $('#mb_prize_3_item_1').text();
    const mb_prize_3_item_2 = $('#mb_prize_3_item_2').text();
    const mb_prize_3_item_3 = $('#mb_prize_3_item_3').text();
    const mb_prize_3_item_4 = $('#mb_prize_3_item_4').text();
    const mb_prize_3_item_5 = $('#mb_prize_3_item_5').text();

    const mb_prize_4_item_0 = $('#mb_prize_4_item_0').text();
    const mb_prize_4_item_1 = $('#mb_prize_4_item_1').text();
    const mb_prize_4_item_2 = $('#mb_prize_4_item_2').text();
    const mb_prize_4_item_3 = $('#mb_prize_4_item_3').text();

    const mb_prize_5_item_0 = $('#mb_prize_5_item_0').text();
    const mb_prize_5_item_1 = $('#mb_prize_5_item_1').text();
    const mb_prize_5_item_2 = $('#mb_prize_5_item_2').text();
    const mb_prize_5_item_3 = $('#mb_prize_5_item_3').text();
    const mb_prize_5_item_4 = $('#mb_prize_5_item_4').text();
    const mb_prize_5_item_5 = $('#mb_prize_5_item_5').text();

    const mb_prize_6_item_0 = $('#mb_prize_6_item_0').text();
    const mb_prize_6_item_1 = $('#mb_prize_6_item_1').text();
    const mb_prize_6_item_2 = $('#mb_prize_6_item_2').text();

    const mb_prize_7_item_0 = $('#mb_prize_7_item_0').text();
    const mb_prize_7_item_1 = $('#mb_prize_7_item_1').text();
    const mb_prize_7_item_2 = $('#mb_prize_7_item_2').text();
    const mb_prize_7_item_3 = $('#mb_prize_7_item_3').text();

    lotes.push({
        mb_prize_1_item_0,
        mb_prize_2_item_0,
        mb_prize_2_item_1,
        mb_prize_3_item_0,
        mb_prize_3_item_1,
        mb_prize_3_item_2,
        mb_prize_3_item_3,
        mb_prize_3_item_4,
        mb_prize_3_item_5,
        mb_prize_4_item_0,
        mb_prize_4_item_1,
        mb_prize_4_item_2,
        mb_prize_4_item_3,
        mb_prize_5_item_0,
        mb_prize_5_item_1,
        mb_prize_5_item_2,
        mb_prize_5_item_3,
        mb_prize_5_item_4,
        mb_prize_5_item_5,
        mb_prize_6_item_0,
        mb_prize_6_item_1,
        mb_prize_6_item_2,
        mb_prize_7_item_0,
        mb_prize_7_item_1,
        mb_prize_7_item_2,
        mb_prize_7_item_3,
    });
    return lotes;
};

const crawl = async () => {
    const lotes = await getPageContent(`${URL}`).then(($) => htmlToLotes($));
    return Lotes.create(lotes);
};

const connectDB = async () => {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-loto.iffyt.mongodb.net/mern-loto?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (error) => {
                if (error) {
                    console.log(
                        'MongoDB connection error. Please make sure MongoDB is running.'
                    );
                    process.exit();
                }

                crawl()
                    .then((lotes) => {
                        if (!lotes)
                            return console.log(`Created ${lotes.length} lotes`);
                        return;
                    })
                    .then(() => {
                        process.exit();
                    });
            }
        );

        console.log('MongoDB for Lotes connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = router;
