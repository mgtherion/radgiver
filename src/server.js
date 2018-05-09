import path from 'path';
import Express from 'express';
import React from 'react';
import isUrl from 'is-url';
import request from 'request';
import cheerio from 'cheerio';
//import mongodb from 'mongodb';
import { Server } from 'http';
import { renderToString } from 'react-dom/server';
import SuggestPage from './components/Suggest/Page';
import ResultPage from './components/Result/Page';


const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));
app.use(Express.json());

/*
var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log('Database connection ready');

    server.listen(process.env.PORT || 3000, function() {
        let port = server.address().port;
        return console.info(`Server running on http://localhost:${port}`);
    });
});
*/

const port = process.env.PORT || 3000;
server.listen(port, function() {
    return console.info(`Server running on http://localhost:${port}`);
});


const isArticleValid = (param) => {
    if (!param) return {'error': 'missing articleUrl parameter'};
    if (!isUrl(param)) return {'error': 'articleUrl should be url'};
    if (param.indexOf('dagbladet.no') === -1) return {'error': 'dagbladet functionality only'};
    return false;
}

app.get(/^\/fb(\/results)?$/, (req, res) => {
    return res.status(200).render('index');
});


app.get('/api/parse', (req, res) => {
    let data = {
        title: '',
        pharagraphs: []
    };
    let url = req.query.articleUrl;
    let err = isArticleValid(url);
    if (err) return res.status(400).json(err);

    request(url, (error, response, body) => {
        if (error) throw error;
        var $ = cheerio.load(body);

        data.title = $('h2.headline').text();
        $("div[itemprop='articleBody'] > p").each(function() {
            data.pharagraphs.push($(this).text());
        });

        return res.status(200).json(data);
    });
});

app.post('/api/suggest', (req, res) => {
    console.log('SUGGESTED', req.body); // id, articleUrl, originalText, usersText, isApproved
});

app.get('/api/results', (req, res) => {

    let data = [
        {
            articleUrl: 'http://article1',
            pharagraphs: [
                {
                    text: 'name1',
                    suggestions: ['text1', 'text2', 'text3']
                },
                {
                    text: 'name2',
                    suggestions: ['text1', 'text2', 'text3']
                },
                {
                    text: 'name3',
                    suggestions: ['text1', 'text2', 'text3']
                },
            ]
        },
        {
            articleUrl: 'http://article2',
            pharagraphs: [
                {
                    text: 'name1',
                    suggestions: ['text1', 'text2', 'text3']
                },
                {
                    text: 'name2',
                    suggestions: ['text1', 'text2', 'text3']
                },
                {
                    text: 'name3',
                    suggestions: ['text1', 'text2', 'text3']
                },
            ]
        },
        {
            articleUrl: 'http://article3',
            pharagraphs: [
                {
                    text: 'name1',
                    suggestions: ['text1', 'text2', 'text3']
                },
                {
                    text: 'name2',
                    suggestions: ['text1', 'text2', 'text3']
                },
                {
                    text: 'name3',
                    suggestions: ['text1', 'text2', 'text3']
                },
            ]
        }
    ]

    return res.status(200).json(data);
});

app.post('/api/approve', (req, res) => {
    console.log('APPROVED', req.body);
});

app.delete('/api/delete', (req, res) => {
    console.log('DELETED', req.body);
});

