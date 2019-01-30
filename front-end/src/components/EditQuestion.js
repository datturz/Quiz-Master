import React, { Component } from 'react'
import axios from 'axios';
export default class EditQuestion extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            question: '',
            answer: '',
        }
    }
    componentWillMount() {
        this.getData()
    }
    getData = () => {
        let dataId = this.props.match.params.id
        axios.get(`http://localhost:3001/crud/${dataId}`)
            .then((respon) => {
                this.setState({
                    id: respon.data[0].id,
                    question: respon.data[0].question,
                    answer: respon.data[0].answer
                })
                // console.log(this.state.question)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    editData = () => {
        let dataId = this.props.match.params.id
        axios.put(`http://localhost:3001/crud/${dataId}`, {
            question: this.state.question,
            answer: this.state.answer
        })
            .then((respon) => {
                this.setState({
                }, () => {
                    setTimeout((x) => {
                        this.props.hitory.push('/')
                    }, 2000);
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }
    delet = ()=>{
        let dataId = this.props.match.params.id
        axios.delete(`http://localhost:3001/crud/${dataId}`)
        .then((respon)=>{
            console.log('deleted succes')
        })
        .catch((err)=>{
            console.log('err')
        })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="form-group">
                            <label forhtml="exampleInputEmail1">Question</label>
                            <input type="text" className="form-control" value={this.state.question}
                                onChange={(e) => { this.setState({ question: e.target.value }) }} placeholder="Enter Question" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label forhtml="exampleInputEmail1">Answer</label>
                            <input type="text" className="form-control" value={this.state.answer}
                                onChange={(e) => { this.setState({ answer: e.target.value }) }} placeholder="Enter Answer" />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-danger" value="Save" onClick={this.editData} />
                    <input type="submit" style={{position: 'absolute',right:'40px'}} className="btn btn-danger " value="Delete" onClick={this.editData} />
                </form>


            </React.Fragment>
        )
    }
}