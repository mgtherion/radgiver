
import path from 'path';
import Express from 'express';
import React from 'react';
//import mongodb from 'mongodb';
import { Server } from 'http';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App from './components/App';


const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
    let status = 200;

    let markup = renderToString(
        <Router location={req.url}>
            <App />
        </Router>
    );

    return res.status(status).render('index', { markup });
});

const port = process.env.PORT || 3003;
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(`Server running on http://localhost:${port}`);
});