import React from 'react';
import { ControlLabel, FormGroup, Col } from 'react-bootstrap';

class Suggestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text
        }
    }

    render() {
        let text = this.state.text;
        return (
            <FormGroup>
                <Col md={10}>{text}</Col>
                <Col md={2}>
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => this.props.approve(text)}>
                            approve
                    </button>
                </Col>
            </FormGroup>
        );
    }
}

export default Suggestion;