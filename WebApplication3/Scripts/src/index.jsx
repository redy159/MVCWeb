import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Component/Product.jsx';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import Carousel from './Component/Carousel.jsx';
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
            .then(data => this.setState({ newProduct: data }));
    }

    getNextPage() {
        console.log(this)
        fetch('/api/Manager/GetNewestProduct?pageNumber=1', {
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
                console.log("test2",tmp)
                this.setState({newProduct : tmp})
            });
    }


    render() {
        if (!this.state.newProduct) return null;
        console.log(this.state.newProduct ? this.state.newProduct : "000");
        const { newProduct } = this.state;
        let receipt = [];
        for (let i=0; i<10; i++)
        {
            receipt.push({
                repCus: Math.random().toString(36).substring(7),
                repTotal: "242000",
                repStatus: "Done",
            })
        }
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
                <div class="container">
                <div class="row w-full">
                    <div class="col-3">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="nav-link nav-pills active show" 
                                id="v-pills-receipt-tab" 
                                data-toggle="pill" 
                                href="#v-pills-receipt" role="tab" 
                                aria-controls="v-pills-receipt" 
                                aria-selected="true">
                                Đơn hàng
                            </a>
                            <a class="nav-link" 
                                id="v-pills-product-tab" 
                                data-toggle="pill" href="#v-pills-product" 
                                role="tab" aria-controls="v-pills-product" 
                                aria-selected="false">
                                Sản phẩm
                            </a>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade active show" id="v-pills-receipt" role="tabpanel" aria-labelledby="v-pills-receipt-tab">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receipt.map((rep, i)=>(
                                        <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{rep.repCus}</td>
                                            <td>{rep.repTotal}</td>
                                            <td>{rep.repStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="v-pills-product" role="tabpanel" aria-labelledby="v-pills-product-tab">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receipt.map((rep, i)=>(
                                        <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{rep.repCus}</td>
                                            <td>{rep.repTotal}</td>
                                            <td>{rep.repStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>

                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));