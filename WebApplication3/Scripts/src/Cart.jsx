import React from 'react';
import ReactDOM from 'react-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartItem: [
                { Name: "pro 1", Brand: "brand 1", Price: 214000, Count: 1 },
                { Name: "pro 2", Brand: "brand 1", Price: 214000, Count: 1 },
                { Name: "pro 3", Brand: "brand 1", Price: 214000, Count: 1 },
                { Name: "pro 4", Brand: "brand 1", Price: 214000, Count: 1 },
                { Name: "pro 5", Brand: "brand 1", Price: 214000, Count: 1 },
            ],
            cartInfo: {
                userId: 12,
                total: 214142,
                cartId: 2,
            }
        }
    }
    render() {
        const { login, sign } = this.state;

        //if (!this.state.data) return null;
        return (
            <React.Fragment >
                <div class="container">
                {this.state.cartItem? this.state.cartItem.map((item)=> (
                    <div class="d-flex flex-row cart">
                        <img class="m-auto" src="./../../../Content/images/comming-soon.jpg"/> 
                        <div class="prod-info">
                            <h2>{item.Name}</h2>
                            <p>{item.Brand}</p>
                        </div>
                        <div class="prod-price text-center">Đơn giá <br/>{item.Price.toLocaleString()} đ</div>
                        <div class="prod-price text-center">
                            <p>Amount Of Money</p>
                            <p>{item.Price.toLocaleString()} đ</p>
                        </div>
                        <button class="btn btn-danger m-auto">Delete</button>
                    </div>
                )):null}
                <h1 class="text-right" style={{padding: "0 35px", marginTop: "0"}}>Total: {this.state.cartInfo.total.toLocaleString()} đ</h1>
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Cart />, document.getElementById("root"));