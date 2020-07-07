import React from 'react';
import './../../../Content/product.css'
export default class Product extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {}
    }
    render() {
        const { data } = this.props;
        return (
        <div className="product-item">
            <img src="./../../../Content/images/comming-soon.png"/> 
            <h3 class="name">
                <a href="" title={data.Name}>{data.Name}</a>
            </h3>
        </div>
        )
    }
}
