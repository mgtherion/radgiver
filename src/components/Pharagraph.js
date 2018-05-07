import React from 'react';

class Pharagraph extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.text.slice();
    }

    render() {
        return (
            <div>
                <span>{this.props.text}</span>
                <textarea>{this.text}</textarea>
                <button>Send</button>
            </div>
        );
    }
}

export default Pharagraph;