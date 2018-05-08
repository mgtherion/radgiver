import React from 'react';

class Pharagraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            edited: props.text.slice()
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(event) {
        this.setState({edited: event.target.value});
    }

    handleSubmit(event) {

    }

    render() {
        const { text, edited } = this.state;
        const enabled = text !== edited;

        return (
            <div className="rad-pharagraph">
                <form>
                    <div>{this.state.text}</div>
                    <textarea
                        defaultValue={this.state.edited}
                        onChange={this.handleEdit}>
                    </textarea>
                    <button
                        disabled={!enabled}>
                            Send
                    </button>
                </form>
            </div>
        );
    }
}

export default Pharagraph;