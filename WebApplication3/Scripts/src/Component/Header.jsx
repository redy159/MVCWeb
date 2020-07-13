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