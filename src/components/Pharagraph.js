import React from 'react';

class Pharagraph extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.text.slice();
    }

    render() {
        return (
            <div className="rad-pharagraph">
                <div>{this.props.text}</div>
                <textarea defaultValue={this.text}></textarea>
                <button>Send</button>
            </div>
        );
    }
}

export default Pharagraph;