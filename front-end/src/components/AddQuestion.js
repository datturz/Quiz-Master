import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class AddQuestion extends Component {
    constructor() {
        super()
        this.state = {
            question: '',
            answer: ''
        }
    }
    kirimData = () => {
        let url = 'http://localhost:3001/crud'
        axios.post(url, {
            question: this.state.question,
            answer: this.state.answer
        })
            .then(x => {
                console.log(x)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <React.Fragment>
                <Link className='btn btn-outline-primary' to='/'>Back</Link>
                <br />
                <br />

                <form>
                    <div className="form-group">
                        <div className="form-group">
                            <label forhtml="exampleInputEmail1">Question</label>
                            <input type="text" className="form-control"
                                onChange={(e) => { this.setState({ question: e.target.value }) }} placeholder="Enter Question" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label forhtml="exampleInputEmail1">Answer</label>
                            <input type="text" className="form-control"
                                onChange={(e) => { this.setState({ answer: e.target.value }) }} placeholder="Enter Answer" />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-danger" value="Save" onClick={this.kirimData} />
                </form>
            </React.Fragment >

        )
    }
}