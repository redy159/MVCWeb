import React from 'react';
import ReactDOM from 'react-dom';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.param,
            quantity: 1
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

    addToCart(){
        var cart = JSON.parse(localStorage.cart)
        var tmp = {Product:this.state.data, Quantity: this.state.quantity}
        console.log(cart)
        var existed = false
        cart.forEach(item => {
            if (item.Product.Id == tmp.Product.Id)
            {
                item.Quantity++
                existed = true
            }
        })
        if (!existed) cart.push(tmp)
        localStorage.cart = JSON.stringify(cart)   
    }

    render() {
        if (!this.state.data) return null;
        let { data } = this.state;
        console.log(this.props)
        return (
            <div class="container">
                <nav aria-label="breadcrumb" style={{ backgroundColor: "#fff!important"}}>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">{data.CategoryName}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{data.Name}</li>
                    </ol>
                </nav>
                <div class="flex flex-row">
                    <div class="product-img">
                        <img src={data.ImageUrl ? data.ImageUrl : "./../../../Content/images/comming-soon.jpg"}/> 
                    </div>
                    <div class="product-info flex flex-column">
                        <h1>{data.Name}</h1><br/><br/>
                        <p><b>Brand: </b>{data.BrandName? data.BrandName: ""}</p>
                        <p><b>Category: </b>{data.CategoryName? data.CategoryName: ""}</p><br/><br/><br/>
                        <h2>{data.Price? data.Price.toLocaleString(): ""}đ</h2><br/>
                        <button type="button" class="btn btn-warning w-full p-5" onClick={()=>{this.addToCart()}}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
            )
    }
}

const param = document.getElementById("root").getAttribute('data-param');
ReactDOM.render(<ProductDetail param={param} />, document.getElementById("root"));