import React from 'react';
import { FormGroup, InputGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Suggestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            isApproved: props.isApproved
        }
    }

    render() {
        let text = this.state.text;
        return (
            <FormGroup>
                <div className="clearfix">
                    <span>{text}</span>
                    {
                        this.state.isApproved ?
                        (
                            <Button
                                bsClass="pull-right btn btn-default"
                                disabled>
                                Approved
                            </Button>
                        ) :
                        (
                            <Button
                                bsClass="pull-right btn btn-default"
                                onClick={() => this.props.approve(text)}>
                                Approve
                            </Button>
                        )
                    }
                </div>
            </FormGroup>
        );
    }
}

export default Suggestion;