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
            <img src="./../../../Content/images/comming-soon.jpg"/> 
            <h3 class="name">
                <a href="" title={data.Name}>{data.Name}</a>
            </h3>
            <div class="product-price">
                <span class="price">{data.Price.toLocaleString()} đ</span>
            </div>
        </div>
        )
    }
}
