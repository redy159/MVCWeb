import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploading from "react-images-uploading";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    testChange(e){
        console.log(e)
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
        const maxNumber = 2;
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
                                    <form class="add-new">
                                        <div class="form-group">
                                            <label for="productName">Product name</label>
                                            <input type="text" class="form-control" id="productName" placeholder="Enter product name" />
                                        </div>
                                        <div class="form-group">
                                            <label for="productPrice">Product price</label>
                                            <input type="number" class="form-control" id="productPrice" placeholder="Price" />
                                        </div>
                                        <div class="form-group">
                                            <ImageUploading
                                                onChange={this.testChange}
                                                acceptType={["jpg", "gif", "png"]}
                                            >
                                                {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                                    // write your building UI
                                                    <div>
                                                        <button onClick={onImageUpload}>Upload images</button>
                                                        <button onClick={onImageRemoveAll}>Remove all images</button>

                                                        {imageList.map((image) => (
                                                            <div key={image.key}>
                                                                <img src={image.dataURL} width="100"/>
                                                                <button onClick={image.onUpdate}>Update</button>
                                                                <button onClick={image.onRemove}>Remove</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </ImageUploading>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
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