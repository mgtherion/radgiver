import React from 'react';
import ArticlesList from './ArticlesList';

class ResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'loading...',
            articles: [],
            status: 'init'
        }
    }

    componentWillMount() {
        fetch('/api/results')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    status: 'loaded',
                    articles: data
                });
            });
    }

    render() {
        let articles = this.state.articles;
        return (
            <div className="row">
                <h2>Result page</h2>
                {
                    articles.map((article) => {
                        return <ArticlesList
                            key={article.articleUrl}
                            text={article.articleUrl}
                            pharagraphs={article.pharagraphs}
                        />
                    })
                }
            </div>
        );
    }
}

export default ResultPage;
