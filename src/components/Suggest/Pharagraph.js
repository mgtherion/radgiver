import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class Pharagraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.article,
            text: props.text,
            edited: props.text
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEdit(event) {
        this.setState({edited: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/suggest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleUrl: this.state.article,
                originalText: this.state.text,
                usersText: this.state.edited
            })
        }).then((response) => {
            console.log('RESPONSE', response);
        });
    }

    render() {
        const { text, edited } = this.state;
        const enabled = text !== edited;

        return (
            <div className="rad-margin rad-pharagraph">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>{this.state.text}</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            placeholder="Suggest a change"
                            defaultValue={this.state.edited}
                            onChange={this.handleEdit}
                        />
                    </FormGroup>
                    <button
                        type="submit"
                        className="btn btn-default"
                        disabled={!enabled}>
                            Send
                    </button>
                </form>
            </div>
        );
    }
}

export default Pharagraph;