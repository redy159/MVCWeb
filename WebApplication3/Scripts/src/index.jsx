import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Component/Product.jsx';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import Carousel from './Component/Carousel.jsx';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPage:1,
        }
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
            .then(data => this.setState({ newProduct: data }));
    }

    getNextPage() {
        console.log(this)
        fetch('/api/Manager/GetNewestProduct?pageNumber='+this.state.currPage, {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                var tmp = [].concat(this.state.newProduct)
                console.log("test1",tmp)
                tmp = tmp.concat(data)
                console.log("test2", tmp)
                this.setState({ newProduct: tmp, currPage: this.state.currPage+1 })
            });
    }


    render() {
        if (!this.state.newProduct) return null;
        console.log(this.state.newProduct ? this.state.newProduct : "000");
        const { newProduct } = this.state;
        return (
            <React.Fragment>
                {/* test react-responsive-carousel */}
                <Carousel showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true} interval={3000} autoPlay={true}>
                    <div >
                        <img class="d-block w-100" src="./../../../Content/images/banner-101.jpg" alt="First slide" />
                    </div>
                    <div>
                        <img class="d-block w-100" src="./../../../Content/images/banner-102.jpg" alt="Second slide" />
                    </div>
                    <div>
                        <img class="d-block w-100" src="./../../../Content/images/banner-101.jpg" alt="Third slide" />
                    </div>
                </Carousel>
                {/* <Carousel /> */}
                <div className="flex product-wrap">
                    {newProduct.map((item) => (
                        <Product data={item} />
                    ))}
                </div>
                <div class="d-flex flex-row">
                    <button type="button" class="btn btn-primary mr-auto ml-auto" onClick={()=>{this.getNextPage()}}>Load more</button>
                </div>
                <br/><br/><br/><br/><br/>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));