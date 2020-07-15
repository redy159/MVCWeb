import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploading from "react-images-uploading";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product:{
                Name:"",
                ImageUrl:"",
                BrandId:1,
                CategoryId:1,
            }
        }
    }

    componentDidMount() {
    }

    addProduct(){
        fetch('/api/Manager/AddProduct', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.product)
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) alert("Add product successfully")
                else alert("Failed to add product")
            });
    }

    imageChange(e) {
        var tmp = {}
        $.extend(tmp,this.state.product)
        tmp.ImageUrl = e[0].dataURL
        this.setState({ product: tmp })
    }

    nameChange(e){
        var tmp = {}
        $.extend(tmp,this.state.product)
        tmp.Name = e.target.value
        this.setState({ product: tmp })
    }

    priceChange(e){
        var tmp = {}
        $.extend(tmp,this.state.product)
        tmp.Price = e.target.value
        this.setState({ product: tmp })
    }

    render() {
        let receipt = [];
        for (let i = 0; i < 10; i++) {
            receipt.push({
                repCus: Math.random().toString(36).substring(7),
                repTotal: "242000",
                repStatus: "Done",
            })
        }
        let {product} = this.state
        console.log(this.state.product, "test")
        return (
            <React.Fragment>
                <div class="container mt-3">
                    <div class="row w-full d-flex">
                        <div class="col-3">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link nav-pills active show"
                                    id="v-pills-receipt-tab"
                                    data-toggle="pill"
                                    href="#v-pills-receipt" role="tab"
                                    aria-controls="v-pills-receipt"
                                    aria-selected="true">
                                    Receipt
                                </a>
                                <a class="nav-link"
                                    id="v-pills-product-tab"
                                    data-toggle="pill" href="#v-pills-product"
                                    role="tab" aria-controls="v-pills-product"
                                    aria-selected="false">
                                    Products
                                </a>
                                <a class="nav-link"
                                    id="v-pills-customer-tab"
                                    data-toggle="pill" href="#v-pills-customer"
                                    role="tab" aria-controls="v-pills-customer"
                                    aria-selected="false">
                                    Customer
                                </a>
                                <a class="nav-link"
                                    id="v-pills-cate-tab"
                                    data-toggle="pill" href="#v-pills-cate"
                                    role="tab" aria-controls="v-pills-cate"
                                    aria-selected="false">
                                    Category
                                </a>
                                <a class="nav-link"
                                    id="v-pills-sport-tab"
                                    data-toggle="pill" href="#v-pills-sport"
                                    role="tab" aria-controls="v-pills-sport"
                                    aria-selected="false">
                                    Sport
                                </a>
                                <a class="nav-link"
                                    id="v-pills-brand-tab"
                                    data-toggle="pill" href="#v-pills-brand"
                                    role="tab" aria-controls="v-pills-brand"
                                    aria-selected="false">
                                    Brand
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
                                            {receipt.map((rep, i) => (
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
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
                                            {receipt.map((rep, i) => (
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{rep.repCus}</td>
                                                    <td>{rep.repTotal}</td>
                                                    <td>{rep.repStatus}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <br /><br />
                                    <div class="add-new">
                                    <h2 class="text-center w-full">Add new product</h2>
                                    <div class="form-group">
                                        <label for="productName">Product name</label>
                                        <input value={product.Name} onChange={(e)=>{this.nameChange(e)}} type="text" class="form-control" id="productName" placeholder="Enter product name" />
                                    </div>
                                    <div class="form-group">
                                        <label for="productPrice">Product price</label>
                                        <input value={product.Price} onChange={(e)=>{this.priceChange(e)}} type="number" class="form-control" id="productPrice" placeholder="Price" />
                                    </div>

                                    <div class="form-group w-full">
                                        <ImageUploading
                                            onChange={(e) => this.imageChange(e)}
                                            acceptType={["jpg", "gif", "png"]}
                                        >
                                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                                <div>
                                                    {imageList.length ? imageList.map((image) => (
                                                        <div key={image.key} class="d-flex flex-column">
                                                            <div class="d-flex flex-row justify-content-between">
                                                                <button class="btn btn-primary" onClick={image.onUpdate}>Update</button>
                                                                <button class="btn btn-primary" onClick={image.onRemove}>Remove</button>
                                                            </div>
                                                            <img src={image.dataURL} />
                                                        </div>
                                                    )) :
                                                        <button class="btn btn-primary" onClick={onImageUpload} > Upload images</button>
                                                    }

                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>
                                    <button onClick={()=>this.addProduct()} class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-customer" role="tabpanel" aria-labelledby="v-pills-customer-tab">
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
                                            {receipt.map((rep, i) => (
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{rep.repCus}</td>
                                                    <td>{rep.repTotal}</td>
                                                    <td>{rep.repStatus}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-cate" role="tabpanel" aria-labelledby="v-pills-cate-tab">
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
                                            {receipt.map((rep, i) => (
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{rep.repCus}</td>
                                                    <td>{rep.repTotal}</td>
                                                    <td>{rep.repStatus}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-sport" role="tabpanel" aria-labelledby="v-pills-sport-tab">
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
                                            {receipt.map((rep, i) => (
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{rep.repCus}</td>
                                                    <td>{rep.repTotal}</td>
                                                    <td>{rep.repStatus}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-brand" role="tabpanel" aria-labelledby="v-pills-sport-brand">
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
                                            {receipt.map((rep, i) => (
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
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
        )
    }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));