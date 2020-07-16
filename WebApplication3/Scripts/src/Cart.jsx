import React from 'react';
import ReactDOM from 'react-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartItem: JSON.parse(localStorage.cart),
            cartInfo: {
                userId: 12,
                cartId: 2,
            },
            total : 0
        }
    }

    createReceipt() {
        var status = JSON.parse(localStorage.loginStatus)
        console.log(status)
        if (!status.IsLogin) alertify.error("Bạn phải đăng nhập trước")
        else{
        var tmp = { Item: this.state.cartItem, Total: this.state.total, UserId : status.UserId}
        console.log(tmp)
        fetch('/api/Manager/CreateReceipt', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmp)
        })
            .then(response => response.json())
            .then(data => {
                if (data.IsSuccess) {
                    localStorage.cart = JSON.stringify([]);
                    this.setState({cartItem:[],total:0})
                }
            });
        }
    }

    componentDidMount(){
        var total = 0
        total = this.totalCalc()
        this.setState({total: total})
    }

    totalCalc()
    {
        var total = 0
        this.state.cartItem.forEach(element => {
            total += element.Product.Price*element.Quantity
        });
        return total
    }

    deleteItem(item){
        var tmp = [].concat(this.state.cartItem)
        tmp.splice(this.state.cartItem.indexOf(item),1);
        localStorage.cart = JSON.stringify(tmp);
        var total = this.totalCalc();
        this.setState({cartItem:tmp,total:total})
    }

    render() {
        const { login, sign } = this.state;
        console.log(this.state.cartItem)
        //if (!this.state.data) return null;
        return (
            <React.Fragment >
                <div class="container d-flex flex-column">
                    {this.state.cartItem ? this.state.cartItem.map((item) => (
                        <div class="d-flex flex-row cart">
                            <img class="m-auto" src={item.Product.ImageUrl ? item.Product.ImageUrl : "./../../../Content/images/comming-soon.jpg"} />
                            <div class="prod-info">
                                <h2>{item.Product.Name}</h2>
                                <p>{item.Product.BrandName}</p>
                            </div>
                            <div class="prod-price text-center">Price <br />{item.Product.Price.toLocaleString()} đ</div>
                            <div class="prod-price text-center">
                                <p>Quantity</p>
                                <p>x{item.Quantity}</p>
                            </div>
                            <button onClick={(e,item)=>this.deleteItem(item)} class="btn btn-danger m-auto">Delete</button>
                        </div>
                    )) : null}
                    <h1 class="text-right" style={{ padding: "0 35px", marginTop: "0" }}>Total: {this.state.total.toLocaleString()} đ</h1>
                    <button onClick={() => this.createReceipt()} style={{margin: "10px auto"}} class="btn btn-success m-auto">Check out</button>
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Cart />, document.getElementById("root"));