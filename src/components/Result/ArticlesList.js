import React from 'react';
import PharagraphsList from './PharagraphsList';
import { Col } from 'react-bootstrap';

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            pharagraphs: props.pharagraphs
        };
    }

    handleApprove(pharagraph, suggestion) {
        fetch('/api/approve', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleUrl: this.state.text,
                originalText: pharagraph,
                usersText: suggestion
            })
        }).then((response) => {
            console.log('RESPONSE', response);
        });
    }

    handleDelete(pharagraph) {
        fetch('/api/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleUrl: this.state.text,
                originalText: pharagraph
            })
        }).then((response) => {
            console.log('RESPONSE', response);
        });
    }

    render() {
        let pharagraphs = this.state.pharagraphs;
        let text = this.state.text;
        return (
            <div className="rad-margin">
                <Col mdOffset={3} md={4}>
                    <h4>Article: {text}</h4>
                    {
                        pharagraphs.map((pharagraph) => {
                            return <PharagraphsList
                                key={pharagraph.text}
                                text={pharagraph.text}
                                suggestions={pharagraph.suggestions}
                                approve={(p, s) => this.handleApprove(p, s)}
                                delete={(p) => this.handleDelete(p)}
                            />
                        })
                    }
                </Col>
            </div>
        );
    }
}

export default ArticlesList;