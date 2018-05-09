import React from 'react';
import Suggestion from './Suggestion';
import { ControlLabel, FormGroup, Col, Form } from 'react-bootstrap';

class PharagraphsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            suggestions: props.suggestions
        };
    }

    render() {
        let suggestions = this.state.suggestions;
        let text = this.state.text;
        return (
            <div className="rad-margin">
                <Form horizontal>
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
                                defaultValue={this.state.text}>
                            </input>
                        </Col>
                        <Col md={2}>
                            <button
                                type="submit"
                                className="btn btn-success">
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
