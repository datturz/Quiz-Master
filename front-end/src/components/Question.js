import React, { Component } from 'react'
import axios from 'axios'
export default class Question extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            question: '',
            answer: '',
            message: '',
        }
    }
    componentWillMount() {
        this.getDatas()
    }
    getDatas = () => {
        axios.get('http://localhost:3001/crud')
            .then((respon) => {
                this.setState({
                    data: respon.data
                })
                
            })
    }
    checkQuestion = () => {
        axios.post('http://localhost:3001/check')
            .then((respon) => {
                if (respon.data.code === 200 ) {
                    this.setstate({
                        message: 'Correct'
                    })
                } else if(respon.data.code === 204) {
                    this.setstate({
                        message:  'Incorrect'
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }


    render() {
        let questions = this.state.data.map((val, id) => {
            return (
                <label htmlFor="question" key={id}>{val.question}</label>
            )
        })
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                        <div className="form-group">
                            {questions}
                            <input type="text" className="form-control" name="answer" id="example" placeholder="Your Answer"
                                onChange={(e) => {
                                    this.setState({
                                        answer: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <button type="submit" onClick={this.checkQuestion} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </React.Fragment >
        )
    }
}