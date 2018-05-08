import React from 'react';
import Pharagraph from './Pharagraph';

class SuggestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'loading...',
            pharagraphs: [],
            status: 'init'
        }
    }

    componentWillMount() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const articleUrl = url.searchParams.get('articleUrl');

        fetch('/api/parse?articleUrl=' + articleUrl)
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
        return (
            <div>
                <h2>{title}</h2>
                <h3>List of pharagraphs:</h3>
                {
                    items.map((item) =>
                        <Pharagraph key={item} text={item} /> // TODO: better key required
                    )
                }
            </div>
        );
    }
}

export default SuggestPage;
