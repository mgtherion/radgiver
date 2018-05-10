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
            error: false,
            article: articleUrl
        }
    }

    componentWillMount() {
        fetch('/api/parse?articleUrl=' + this.state.article)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: true,
                        title: data.error
                    });
                } else {
                    this.setState({
                        title: data.title,
                        pharagraphs: data.pharagraphs
                    });
                }
            });
    }

    render() {
        let title = this.state.title;
        let items = this.state.pharagraphs;
        let article = this.state.article;

        return (
            <div>
                <h2>{ title }</h2>
                {
                    this.state.error? '' :
                    (
                        <div>
                            <h3>List of pharagraphs</h3>
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
                    )
                }
            </div>
        );
    }
}

export default SuggestPage;
