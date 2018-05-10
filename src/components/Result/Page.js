import React from 'react';
import ArticlesList from './ArticlesList';

class ResultPage extends React.Component {
    constructor(props) {
        super(props);

        const url_string = window.location.href;
        const url = new URL(url_string);
        const showApproved = url.searchParams.get('showApproved');

        this.state = {
            title: 'loading...',
            articles: [],
            error: false,
            showApproved: showApproved
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        fetch('/api/results?showApproved=' + this.state.showApproved)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    title: 'Result page',
                    articles: data
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
        let title = this.state.title;

        return (
            <div>
                <h2>{ title }</h2>
                {
                    this.state.error ? '':
                    (
                        <div>
                            {
                                articles.map((article) =>
                                    <ArticlesList
                                        key={article.articleUrl}
                                        text={article.articleUrl}
                                        pharagraphs={article.pharagraphs}
                                        removeArticle={(i) => this.handleDelete(i)}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

export default ResultPage;
