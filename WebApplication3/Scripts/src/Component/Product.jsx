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
            <a href={"/Home/ProductDetail?id="+ data.Id}>
                <img src={data.ImageUrl ? data.ImageUrl : "./../../../../Content/images/comming-soon.jpg"}/> 
                <h2 class="name">
                    <strong><a href="" title={data.Name}>{data.Name}</a></strong>
                </h2>
                <div class="product-price">
                    <span class="price">{data.Price.toLocaleString()} đ</span>
            </div>
            </a>
        </div>
        )
    }
}
