import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Crud extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container container-fluid">
                    <form>
                        <div className="form-group">
                            <label htmlFor="question">Quiz Case</label>
                        </div>
                        <Link to="/answer" className="btn btn-warning">Star Your Quiz</Link>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}