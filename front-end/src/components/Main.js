import React, { Component } from 'react'
import '../App.css'
import logo from '../logo.svg';
export default class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Rect Quiz</h2>
                    </header>
                </div>
            </React.Fragment>
        )
    }
}