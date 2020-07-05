import React from 'react';
import './../../../Content/header.css'
export default class Header extends React.Component {
    componentDidMount() {
        fetch('/api/Manager/GetSportMenu', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.data)
        })
            .then(response => {response.text() ? response.json(): {}});
    }

    render() {
        console.log(this.state.data? this.state.data : "000");
        return (
            <div>
                <div class="navigation">
                    <div class="container">
                        <div class="row">
                            <ul class="col flex justify-content-between">
                            
                            <p>Hello, {person.name} from {person.country}!</p>
                                <li class="dropdown">
                                    <a><strong>Football</strong></a>
                                    <ul class="dropdown-content">
                                        <li><a href="">Football Helmets</a></li>
                                        <li><a href="">Facemasks</a></li>
                                        <li><a href="">Gloves</a></li>
                                        <li><a href="">Pants</a></li>
                                        <li><a href="">Shoulder Pads</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}