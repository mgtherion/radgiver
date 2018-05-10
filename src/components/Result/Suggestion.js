import React from 'react';
import { FormGroup, InputGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

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
                <div className="clearfix">
                    <span>{text}</span>
                    <Button
                        bsClass="pull-right btn btn-default"
                        onClick={() => this.props.approve(text)}>
                        Approve
                    </Button>
                </div>
            </FormGroup>
        );
    }
}

export default Suggestion;