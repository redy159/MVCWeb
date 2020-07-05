import React from 'react';
import './../../../Content/header.css'
export default class Header extends React.Component {

    render() {
        return (
            <div>
                <div class="navigation">
                    <div class="container">
                        <div class="row">
                            <ul class="col flex justify-content-between">
                                <li class="has-dropdown">
                                    <a ><strong>Football</strong></a>
                                    <ul class="level-2">
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