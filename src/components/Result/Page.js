import React from 'react';
import ArticlesList from './ArticlesList';

class ResultPage extends React.Component {
    constructor(props) {
        super(props);

        //TODO check for isApproved url param and send it

        this.state = {
            title: 'loading...',
            articles: [],
            error: false
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        fetch('/api/results')
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                this.setState({
                    articles: data
                });
            })
            .catch((error) => {
                this.setState({
                    error: error
                });
            });
    }

    handleDelete(name) {
        let articles = this.state.articles.slice();
        articles = articles.filter(a => a.articleUrl !== name);
        this.setState({
            articles: articles
        })
    }

    render() {
        let articles = this.state.articles;
        return (
            //TODO work on markup
            <div>
                { this.state.error ?
                    <span>this.state.error</span> :
                    <div className="row">
                        <h2>Result page</h2>
                        {
                            articles.map((article) => {
                                return <ArticlesList
                                    key={article.articleUrl}
                                    text={article.articleUrl}
                                    pharagraphs={article.pharagraphs}
                                    removeArticle={(i) => this.handleDelete(i)}

                                />
                            })
                        }
                    </div>
                }
            </div>
        );
    }
}

export default ResultPage;
