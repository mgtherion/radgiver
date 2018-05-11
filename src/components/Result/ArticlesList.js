import React from 'react';
import PharagraphsList from './PharagraphsList';
import { Panel } from 'react-bootstrap';

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            pharagraphs: props.pharagraphs
        };

        this.handleRequestCreate = this.handleRequestCreate.bind(this);
        this.handleRequestApprove = this.handleRequestApprove.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleRequestCreate(pharagraph, suggestion) {
        fetch('/api/suggest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                articleUrl: this.state.text,
                originalText: pharagraph,
                usersText: suggestion,
                isApproved: true
            })
        }).then((response) => {
            this.handleDelete(pharagraph);
        });
    }

    handleRequestApprove(pharagraph, suggestion) {
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
            this.handleDelete(pharagraph);
        });
    }

    handleRequestDelete(pharagraph) {
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
            this.handleDelete(pharagraph);
        });
    }

    handleDelete(name) {
        let pharagraphs = this.state.pharagraphs.slice();
        pharagraphs = pharagraphs.filter(p => p.text !== name);
        this.setState({
            pharagraphs: pharagraphs
        })
        if (!pharagraphs.length) {
            this.props.removeArticle(this.state.text);
        }
    }

    render() {
        let pharagraphs = this.state.pharagraphs;
        let text = this.state.text;
        return (
            <Panel>
                <Panel.Heading>
                    <h4>Article URL: {text}</h4>
                </Panel.Heading>
                <Panel.Body>
                    {
                        pharagraphs.map((pharagraph) => {
                            return <PharagraphsList
                                key={pharagraph.text}
                                text={pharagraph.text}
                                suggestions={pharagraph.suggestions}
                                approve={(p, s) => this.handleRequestApprove(p, s)}
                                delete={(p) => this.handleRequestDelete(p)}
                                create={(p, s) => this.handleRequestCreate(p, s)}
                            />
                        })
                    }
                </Panel.Body>
            </Panel>
        );
    }
}

export default ArticlesList;