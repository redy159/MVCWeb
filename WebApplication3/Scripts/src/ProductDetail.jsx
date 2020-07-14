import React from 'react';
import ReactDOM from 'react-dom';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.param
        }
    }

    componentDidMount() {
        fetch("/api/Manager/GetProductById?id=" + this.state.id, {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        if (!this.state.data) return null;
        let { data } = this.state;
        return (
            <div class="container">
                <nav aria-label="breadcrumb" style={{ backgroundColor: "#fff!important"}}>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">{data.Category}</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{data.Name}</li>
                    </ol>
                </nav>
                <div class="flex flex-row">
                    <div class="product-img">
                        <img src="./../../../Content/images/comming-soon.jpg"/> 
                    </div>
                    <div class="product-info flex flex-column">
                        <h1>{data.Name}</h1><br/><br/>
                        <p>{data.Brand? data.Brand: ""}</p>
                        <p>{data.Category? data.Category: ""}</p><br/><br/><br/>
                        <h2>{data.Price? data.Price: ""}</h2><br/>
                        <button type="button" class="btn btn-warning w-full p-5" >Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
            )
    }
}

const param = document.getElementById("root").getAttribute('data-param');
ReactDOM.render(<ProductDetail param={param} />, document.getElementById("root"));