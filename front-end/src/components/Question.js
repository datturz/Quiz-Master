import React, { Component } from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert2-react'
export default class Question extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            question: '',
            answer: '',
            message: '',
            tes: '',
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
                // console.log(this.state.data)
            })
    }
    checkQuestion = () => {
        let arr = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh']
        axios.post('http://localhost:3001/check', {
            answer: this.state.answer
        })
            .then(respon => {
                if (respon.data.code === 204) {
                    this.setState({
                        show: true,
                        message: `${this.state.answer}  incoreect`
                    }, () => {
                        setTimeout((x) => {
                            this.setState({
                                show: false,
                                message: ''
                            })
                        })
                    })

                } else if (respon.data.code === 200) {
                    this.setState({
                        show: true,
                        message: `${this.state.answer} correct`
                    }, () => {
                        setTimeout((x) => {
                            this.setState({
                                show: false,
                                message: ''
                            })
                        })
                    })
                }

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
                {
                    this.state.show ?
                        <SweetAlert
                            show={this.state.show}
                            title="Alert"
                            text={this.state.message}
                            onConfirm={() => this.setState({ show: false })}
                        /> :
                        ''
                }
                <div className="container-fluid">
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <div className="form-group">
                            {questions}
                            <div className="hooh">{this.state.message}</div>
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