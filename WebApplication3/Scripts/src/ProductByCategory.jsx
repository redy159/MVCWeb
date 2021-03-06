﻿import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Component/Product.jsx';

class ProductByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModel: {
                CateId: 1,
                BrandId: 2,
            }
        }
    }

    componentDidMount() {
        fetch('/api/Manager/GetProductFilter', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.searchModel)
        })
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        if (!this.state.data) return null;
        let { data } = this.state;
        console.log(this.state.data)
        return (
            <div class="container">
                <nav aria-label="breadcrumb" style={{ backgroundColor: "#fff!important"}}>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">{data.Category? data.Category : "Cate"}</a></li>
                    </ol>
                </nav>
                <div className="flex product-wrap">
                    {data.map((item) => (
                        <Product data={item} />
                    ))}
                </div>
            </div>
            )
    }
}

ReactDOM.render(<ProductByCategory />, document.getElementById("root"));