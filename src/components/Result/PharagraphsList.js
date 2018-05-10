import React from 'react';
import Suggestion from './Suggestion';
import { Panel, ControlLabel, FormGroup, Col, Form, Button } from 'react-bootstrap';

class PharagraphsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            suggestions: props.suggestions,
            newSuggestion: props.text
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEdit(event) {
        this.setState({newSuggestion: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        let suggestions = this.state.suggestions;
        let text = this.state.text;
        let newSuggestion = this.state.newSuggestion;
        const enabled = text !== newSuggestion;
        return (
            <Panel>
                <Panel.Heading>
                    <div className="clearfix">
                        <strong className="pull-left font-weight-bold">Original text: {text}</strong>
                        <Button
                            className="btn pull-right"
                            onClick={() => this.props.delete(text)}>
                                Delete
                        </Button>
                    </div>
                </Panel.Heading>
                <Panel.Body>
                    {
                        suggestions.map((suggestion) => {
                            return <Suggestion
                                key={suggestion}
                                text={suggestion}
                                approve={(s) => {this.props.approve(text, s)}}
                            />
                        })
                    }
                    <FormGroup>
                        <div className="clearfix margin-left">
                            <div className="col-md-6">
                                <input
                                    class="form-control"
                                    defaultValue={newSuggestion}
                                    onChange={this.handleEdit}>
                                </input>
                            </div>

                            <button
                                className="btn btn-default pull-right"
                                onClick={() => this.props.create(text, newSuggestion)}
                                disabled={!enabled}>
                                    Create&Approve
                            </button>
                        </div>
                    </FormGroup>
                </Panel.Body>
            </Panel>
        );
    }
}

export default PharagraphsList;
