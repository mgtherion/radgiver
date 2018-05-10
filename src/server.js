import path from 'path';
import Express from 'express';
import isUrl from 'is-url';
import request from 'request';
import cheerio from 'cheerio';
import mongodb from 'mongodb';
import _ from 'lodash';
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


var db;
const SUGGESTIONS_COLLECTION = 'suggestions';


mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log('Database connection ready');

    const port = process.env.PORT || 3000;
    server.listen(port, function() {
        return console.info(`Server running on http://localhost:${port}`);
    });
});

/*const port = process.env.PORT || 3000;
server.listen(port, function() {
    return console.info(`Server running on http://localhost:${port}`);
});*/

const formatResults = (items, showApproved = false) => {
    let articles = new Set(items.map(item => item.articleUrl));
    let results = [];

    for (let aName of [...articles]) {
        let article = {
            articleUrl: aName,
            pharagraphs: []
        }

        let suggestionsByArticle = items
            .filter(item => item.articleUrl === aName);
        let pharagraphs = new Set(suggestionsByArticle.map(item => item.originalText));

        for (let pName of [...pharagraphs]) {
            let pharagraph = {
                text: pName,
                suggestions: []
            }

            let suggestionsByOriginal = suggestionsByArticle
                .filter(item => item.originalText === pName);

            let hasApproved = false;
            suggestionsByOriginal.map((item) => {
                if (item.isApproved) {
                    hasApproved = true;
                }
                pharagraph.suggestions.push(item.usersText);
            });
            if (hasApproved === showApproved) {
                article.pharagraphs.push(pharagraph);
            }
        }
        if (article.pharagraphs.length) {
            results.push(article);
        }
    }

    return results;
}

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

//TODO approve flag
app.get('/api/results', (req, res) => {
    let showApproved = (req.query.showApproved == 'true');

    db.collection(SUGGESTIONS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            res.status(500).json({'error': err.message});
        } else {
            res.status(200).json(formatResults(docs, showApproved));
        }
    });
});

app.post('/api/suggest', (req, res) => {
    let newSuggestion = {
        articleUrl: req.body.articleUrl,
        originalText: req.body.originalText,
        usersText: req.body.usersText,
        isApproved: req.body.isApproved == 'true'//TODO WHAT ? true: false
    }

    db.collection(SUGGESTIONS_COLLECTION).insertOne(
        newSuggestion,
        function(err, docs) {
            if (err) {
                console.log('ERROR', err);
                res.status(500).json({'error': err.message});
            } else {
                res.status(201).json(docs);
            }
        }
    );
});

app.post('/api/approve', (req, res) => {
    let suggestion = {
        articleUrl: req.body.articleUrl,
        originalText: req.body.originalText
    }
    db.collection(SUGGESTIONS_COLLECTION).updateMany(
        suggestion,
        { $set: { 'isApproved': false }},
        function(err, docs) {
            if (err) {
                res.status(500).json({'error': err.message});
            } else {
                suggestion.usersText = req.body.usersText;
                db.collection(SUGGESTIONS_COLLECTION).updateOne(
                    suggestion,
                    { $set: { 'isApproved': true }},
                    function(err, docs) {
                        if (err) {
                            res.status(500).json({'error': err.message});
                        } else {
                            res.status(201).json(docs);
                        }
                    }
                );
            }
        }
    );
    db.collection(SUGGESTIONS_COLLECTION).updateOne(
        suggestion,
        { $set: { 'isApproved': true }},
        function(err, docs) {
            if (err) {
                res.status(500).json({'error': err.message});
            } else {
                res.status(201).json(docs);
            }
        }
    );
});

app.delete('/api/delete', (req, res) => {
    let pharagraph = {
        articleUrl: req.body.articleUrl,
        originalText: req.body.originalText
    }
    db.collection(SUGGESTIONS_COLLECTION).deleteMany(
        pharagraph,
        function(err, docs) {
            if (err) {
                res.status(500).json({'error': err.message});
            } else {
                res.status(200).json(docs);
            }
        }
    );
});

