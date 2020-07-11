import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Component/Product.jsx';
import Carousel from './Component/Carousel.jsx';
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
                <Carousel/>
                <div className="flex product-wrap">
                    {newProduct.map((item)=> (
                        <Product data={item}/>
                    ))}
                </div>
                <div class="d-flex flex-row">
                    <button type="button" class="btn btn-primary mr-auto ml-auto" onClick={this.getNextPage.bind(this)}>Load more</button>
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));