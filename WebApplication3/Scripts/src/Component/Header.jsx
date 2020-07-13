import React from 'react';
import ReactDOM from 'react-dom'
import './../../../Content/header.css'
class Header extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        fetch('/api/Manager/GetSportMenu', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data=> this.setState({data:data}));
        
    }

    render() {
        if (!this.state.data) return null;
        return (
            <React.Fragment>
                <div class="container flex flex-row pl-3 pr-3">
                    <div class="logo">
                        <a><h2>Sport <br/>Equipment</h2></a>
                    </div>
                    <button type="button" class="btn btn-light log-in">Đăng nhập</button>
                    <button type="button" class="btn btn-light sign-up">Đăng ký</button>
                </div>
                <div class="navigation">
                    <div class="container">
                        <div class="row">
                            <ul class="col flex justify-content-between">
                            {this.state.data.map((item) => (
                                <li class="dropdown">
                                    <a><strong>{item.Name}</strong></a>
                                    <ul class="dropdown-content">
                                        {item.Categories.map((cate) => (
                                            <li><a href="">{cate.Name}</a></li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Header />, document.getElementById("header"));