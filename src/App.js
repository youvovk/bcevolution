import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'
import MainPage from './components/MainPage'
import SecondPage from './components/SecondPage'
import { Route, Switch } from 'react-router-dom'
import Page from './pages/Page'
// Pages
import * as Pages from './pages'

export default class App extends ReactQueryParams {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            page: 'main',
        };

        this.handleStep = this.handleStep.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.handleForward = this.handleForward.bind(this);
    }

    handleStep = (step) => {
        this.setState({step})
    };

    handleForward = (params) => {
        this.props.handleLeadStep(params);
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params)
        .then(() => this.setState({ step: 1 }))
    };

    pageHandler(page) {
        window.scrollTo(0, 0);

        switch (page) {
            default:  
                this.setState({page: 'main'});
                break;
            case 'agreement':
                this.setState({page: Pages.agreement});
                break;
            case 'privacy':
                this.setState({page: Pages.privacy});
                break;
            case 'gov':
                this.setState({page: Pages.gov});
                break;
            case 'risc':
                this.setState({page: Pages.risc});
                break;
        }

    }

    render() {

        if (this.state.page === 'main') {
            return (
                <div className='App'>
                    <Switch>
                        <Route exact path="/" render={(routeProps) =>
                            <MainPage {...this.props} {...routeProps}/>}
                        />
                        <Route path="/members" render={(routeProps) =>
                            <SecondPage {...this.props} {...routeProps}/>}
                        />
                    </Switch>
                </div>
            )
        } else {
            return (
                <Page page={this.state.page} pageHandler={this.pageHandler}></Page>
            )
        }
    }
}
