import path from 'path';
import Express from 'express';
import React from 'react';
import isUrl from 'is-url';
import request from 'request';
import cheerio from 'cheerio';
import mongodb from 'mongodb';
import { Server } from 'http';
import { renderToString } from 'react-dom/server';
import SuggestPage from './components/SuggestPage';


const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));

const isArticleValid = (param) => {
    if (!param) return {'error': 'missing articleUrl parameter'};
    if (!isUrl(param)) return {'error': 'articleUrl should be url'};
    if (param.indexOf('dagbladet.no') === -1) return {'error': 'dagbladet functionality only'};
    return false;
}

app.get('/fb', (req, res) => {
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
        let markup = renderToString(
            <SuggestPage
                data={data}
            />
        );

        return res.status(200).render('index', { markup });
    });
});



const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.info(`Server running on http://localhost:${port}`);
});