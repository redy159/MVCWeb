import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Component/test.jsx';
import Product from './Component/Product.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        fetch('/api/Manager/GetNewestProduct?pageNumber=0', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data=> this.setState({newProduct: data}));
    }

    getNextPage(){
        console.log(this)
        fetch('/api/Manager/GetNewestProduct?pageNumber=1', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data=> this.setState({newProduct: data}));
    }
    

    render() {
        if (!this.state.newProduct) return null;
        console.log(this.state.newProduct? this.state.newProduct : "000");
        const { newProduct } = this.state;
        return (
            <React.Fragment>
                <div className="flex product-wrap">
                    {newProduct.map((item)=> (
                        <Product data={item}/>
                    ))}
                </div>
                <div onClick={this.getNextPage.bind(this)}>Click</div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));