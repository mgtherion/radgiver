import React from 'react';
import Pharagraph from './Pharagraph';

class SuggestPage extends React.Component {
    render() {
        let title = this.props.data.title;
        let items = this.props.data.pharagraphs;

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
