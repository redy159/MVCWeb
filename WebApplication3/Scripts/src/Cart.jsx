import React from 'react';
import ReactDOM from 'react-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartItem: JSON.parse(localStorage.cart),
            cartInfo: {
                userId: 12,
                total: 214142,
                cartId: 2,
            }
        }
    }

    createReceipt(){
        var tmp = {Item: this.state.cartItem, Total: this.state.cartInfo.total}
        fetch('/api/Manager/CreateReceipt', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmp)
        })
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        const { login, sign } = this.state;
        console.log(this.state.cartItem)
        
        //if (!this.state.data) return null;
        return (
            <React.Fragment >
                <div class="container">
                {this.state.cartItem? this.state.cartItem.map((item)=> (
                    <div class="d-flex flex-row cart">
                        <img class="m-auto" src={item.Product.ImageUrl ? item.Product.ImageUrl : "./../../../Content/images/comming-soon.jpg"}/> 
                        <div class="prod-info">
                            <h2>{item.Product.Name}</h2>
                            <p>{item.Product.BrandName}</p>
                        </div>
                        <div class="prod-price text-center">Đơn giá <br/>{item.Product.Price.toLocaleString()} đ</div>
                        <div class="prod-price text-center">
                            <p>Amount Of Money</p>
                            <p>{item.Product.Price.toLocaleString()} đ</p>
                        </div>
                        <button onClick={()=>this.createReceipt()} class="btn btn-danger m-auto">Delete</button>
                    </div>
                )):null}
                <h1 class="text-right" style={{padding: "0 35px", marginTop: "0"}}>Total: {this.state.cartInfo.total.toLocaleString()} đ</h1>
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Cart />, document.getElementById("root"));