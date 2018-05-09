import React from 'react';
import Suggestion from './Suggestion';
import { ControlLabel, FormGroup, Col, Form } from 'react-bootstrap';

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
            <div className="rad-margin">
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Col md={10}><h5>{text}</h5></Col>
                        <Col md={2}>
                            <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={() => this.props.delete(text)}>
                                    delete
                            </button>
                        </Col>
                    </FormGroup>

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
                        <Col md={10}>
                            <input
                                type="text"
                                defaultValue={newSuggestion}
                                onChange={this.handleEdit}>
                            </input>
                        </Col>
                        <Col md={2}>
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={() => this.props.create(text, newSuggestion)}
                                disabled={!enabled}>
                                    approve
                            </button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default PharagraphsList;
