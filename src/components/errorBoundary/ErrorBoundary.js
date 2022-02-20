import React, { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidCatch(error, errorInf0) {
        console.log(error, errorInf0);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
