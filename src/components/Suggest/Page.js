import React from 'react';
import Pharagraph from './Pharagraph';

class SuggestPage extends React.Component {
    constructor(props) {
        super(props);

        const url_string = window.location.href;
        const url = new URL(url_string);
        const articleUrl = url.searchParams.get('articleUrl');

        this.state = {
            title: 'loading...',
            pharagraphs: [],
            status: 'init',
            article: articleUrl
        }
    }

    componentWillMount() {
        fetch('/api/parse?articleUrl=' + this.state.article)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    status: 'loaded',
                    title: data.title,
                    pharagraphs: data.pharagraphs
                });
            });

    }

    render() {
        let title = this.state.title;
        let items = this.state.pharagraphs;
        let article = this.state.article;
        return (
            <div className="row">
                <h2>{title}</h2>
                <h3>List of pharagraphs:</h3>
                {
                    items.map((item) =>
                        <Pharagraph
                            key={item}
                            text={item}
                            article={article}
                        />
                    )
                }
            </div>
        );
    }
}

export default SuggestPage;
