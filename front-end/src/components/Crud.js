import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
export default class Crud extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        this.getData()
    }
    getData = () => {
        axios.get('http://localhost:3001/crud')
            .then((respon) => {
                this.setState({
                    data: respon.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const question = this.state.data.map((dataQuestion, i) => {
            return (
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{dataQuestion.question}</td>
                    <td>{dataQuestion.answer}</td>
                    <td><Link to={`/crud/edit/${dataQuestion.id}`} className="btn btn-outline-primary"><i className="far fa-edit">Edit</i></Link></td>
                </tr>
            )
        })
        return (
            <React.Fragment>
                <div className="container container-fluid">
                    <div className="row">
                        <Link to="/crudd/add" style={{ marginLeft: '20px' }} className="btn btn-danger"><i className="fas fa-plus-circle">Add Question</i></Link>
                    </div>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Question Title</th>
                                <th scope="col">Question Answer</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {question}
                        </tbody>
                    </table>

                </div>
            </React.Fragment >
        )
    }
}