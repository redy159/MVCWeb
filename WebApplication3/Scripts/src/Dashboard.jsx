import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploading from "react-images-uploading";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import EditForm from "./Component/EditForm.jsx"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                Id: 0,
                Name: "",
                ImageUrl: "",
            },
            cate: {
                Id: 0,
                Name: "",
                SportId: 0,
            },
            cateOption: [],
            brandOption: [],
            sportOption: [],
            selectedSport: "",
            selectedCatelogy: "",
            selectedBrand: "",
            modalCate: false,
            modalSport: false,
            modalProduct: false,
        }
    }

    componentDidMount() {
        this.getAllBrand();
        this.getAllSport();
        this.getAllCate();
        this.getAllUser();
        this.getAllProduct();
    }

    getAllProduct() {
        fetch('/api/Manager/GetAllProduct', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ productList: data })
            });
    }

    getAllUser() {
        fetch('/api/Manager/GetAllUser', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data })
            });
    }

    getAllBrand() {
        fetch('/api/Manager/GetBrandMenu', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    this.state.brandOption.push({ value: element.Id, label: element.Name })
                });
                this.setState({ brandList: data })
            });
    }

    getAllSport() {
        fetch('/api/Manager/GetSportMenu', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    this.state.sportOption.push({ value: element.Id, label: element.Name })
                });
                this.setState({ sportList: data })
            });
    }

    getAllCate() {
        fetch('/api/Manager/GetCategoryMenu', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    this.state.cateOption.push({ value: element.Id, label: element.Name })
                });
                this.setState({ cateList: data })
            });
    }

    submitProduct() {
        if (this.state.product.Id) this.editProduct()
        else this.addProduct()
    }

    submitCate() {
        if (this.state.cate.Id) this.editCate()
        else this.addCate()
    }

    editCate() {
        let { cate } = this.state
        var tmp =
        {
            Id : cate.Id,
            Name: cate.Name,
            SportId: this.state.selectedSport.value,
        }
        console.log("add", tmp)
        fetch('/api/Manager/UpdateCategory', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmp)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.IsSuccess) {
                    alertify.success("Edit category successfully")
                    this.getAllCate()
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to add category")
            });
    }

    addCate() {
        let { cate } = this.state
        var tmp =
        {
            Id : 0,
            Name: cate.Name,
            SportId: this.state.selectedSport.value,
        }
        console.log("add", tmp)
        fetch('/api/Manager/AddCategory', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmp)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.IsSuccess) {
                    alertify.success("Add Category successfully")
                    this.getAllCate()
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to add category")
            });
    }

    addProduct() {
        let { product } = this.state
        var tmp =
        {
            Name: product.Name,
            BrandId: this.state.selectedBrand.value,
            CategoryId: this.state.selectedCatelogy.value,
            ImageUrl: product.ImageUrl,
            Price: product.Price,
        }
        console.log("add", tmp)
        fetch('/api/Manager/AddProduct', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmp)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.IsSuccess) {
                    alertify.success("Add product successfully")
                    this.getAllProduct()
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to add product")
            });
    }

    editProduct() {
        let { product } = this.state
        var tmp =
        {
            Id: product.Id,
            Name: product.Name,
            BrandId: this.state.selectedBrand.value,
            CategoryId: this.state.selectedCatelogy.value,
            ImageId: product.ImageId,
            ImageUrl: product.ImageUrl,
            Price: product.Price,
        }
        console.log("up", tmp)
        fetch('/api/Manager/EditProduct', {
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
                    alertify.success("Edit product successfully")
                    this.getAllProduct()
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to add product")
            });
    }

    imageChange(e) {
        var tmp = {}
        $.extend(tmp, this.state.product)
        tmp.ImageUrl = e[0].dataURL
        tmp.ImageId = 0
        this.setState({ product: tmp })
    }

    cateNameChange(e) {
        var tmp = {}
        $.extend(tmp, this.state.cate)
        tmp.Name = e.target.value
        this.setState({ cate: tmp })
    }

    nameChange(e) {
        var tmp = {}
        $.extend(tmp, this.state.product)
        tmp.Name = e.target.value
        this.setState({ product: tmp })
    }

    priceChange(e) {
        var tmp = {}
        $.extend(tmp, this.state.product)
        tmp.Price = e.target.value
        this.setState({ product: tmp })
    }

    selectCatelogy(e) {
        this.setState({ selectedCatelogy: e })
    }

    selectBrand(e) {
        this.setState({ selectedBrand: e })
    }

    selectSport(e) {
        this.setState({ selectedSport: e })
    }

    onOpenModalUpdateCate(item) {
        var t = $.extend({}, item)
        this.setState({
            modalCate: true,
            cate:item,
            selectedSport: { value: item.SportId, label: item.Sport.Name },
        });
    };
    onOpenModalUpdateSport(item) {
        console.log(item)
        this.setState({ modalSport: true, eSportId: item.Id });
    };
    onOpenModalCreateProduct() {
        this.setState({
            modalProduct: true, product: {

                Id: 0,
                Name: "",
                ImageUrl: "",
            }
        });
    };

    onOpenModalCreateCate(){
        this.setState({
            modalCate: true, cate: {

                Id: 0,
                Name: "",
                SportId:0,
            }
        });
    }
    onOpenModalUpdateProduct(item) {
        var t = $.extend({}, item)
        t.ImageUrl = item.ImageFile.ImageUrl
        this.setState({
            modalProduct: true,
            product: t,
            selectedBrand: { value: item.BrandId, label: item.Brand.Name },
            selectedCatelogy: { value: item.CategoryId, label: item.Category.Name }
        });
    }
    handleEditCate() {
        console.log("Edit cate");
        console.log("name : " + document.getElementById("cateEditName").value);
    }
    onCloseModalCate() {
        this.setState({ modalCate: false });
    };
    onCloseModalSport() {
        this.setState({ modalSport: false });
    };
    onCloseModalProduct() {
        this.setState({ modalProduct: false })
    }

    deleteCate(id){
        fetch('/api/Manager/DeleteCategory?id='+id, {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.IsSuccess) {
                    alertify.success("Delete Category successfully")
                    this.getAllCate();
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to delete Category")
            });
    }

    deleteSport(id){
        fetch('/api/Manager/DeleteSport?id='+id, {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.IsSuccess) {
                    alertify.success("Delete Sport successfully")
                    this.getAllSport()
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to delete Sport")
            });
    }

    editSport(){
        var tmp = {
            Id : this.state.eSportId,
            Name: document.getElementById("NameEditName").value
        }
        fetch('/api/Manager/UpdateSport', {
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
                    alertify.success("Edit Sport successfully")
                    this.getAllSport()
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to add Sport")
            });
    }

    editBrand(){
        var tmp = {
            Id : this.state.eBrandId,
            Name: document.getElementById("NameEditName").value
        }
        fetch('/api/Manager/UpdateBrand', {
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
                    alertify.success("Edit Sport successfully")
                    this.getAllBrand()
                    this.onCloseModalProduct()
                }
                else alertify.error("Failed to add Sport")
            });
    }

    render() {
        var receipt = []
        var status = JSON.parse(localStorage.loginStatus)
        if (status.UserType != 1) return null
        console.log(this.state)
        let { cate, productList, userList, brandList, sportList, cateList, cateOption, product, brandOption, sportOption } = this.state
        return (
            <React.Fragment>
                <div class="container mt-3">
                    <div class="row w-full d-flex">
                        <div class="col-3">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link nav-pills active show"
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
                                <div class="tab-pane fade" id="v-pills-receipt" role="tabpanel" aria-labelledby="v-pills-receipt-tab">
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
                                <div class="tab-pane fade active show" id="v-pills-product" role="tabpanel" aria-labelledby="v-pills-product-tab">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Brand</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Edit/ Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productList ? productList.map((prod, i) => (
                                                <tr>
                                                    <th scope="row">{prod.Name ? prod.Name : "N/A"}</th>
                                                    <td>{prod.Brand.Name ? prod.Brand.Name : "N/A"}</td>
                                                    <td>{prod.Price}</td>
                                                    <td>{prod.Category.Name ? prod.Category.Name : "N/A"}</td>
                                                    <td>
                                                        <button onClick={() => this.onOpenModalUpdateProduct(prod)} class="btn btn-primary">Edit</button>
                                                        {/* <button class="btn btn-danger">Delete</button> */}
                                                    </td>
                                                </tr>
                                            )) : null}
                                        </tbody>
                                    </table>
                                    <button onClick={() => this.onOpenModalCreateProduct()} class="btn btn-danger">Create New Product</button>
                                    <br />

                                    <br />

                                    <Modal center open={this.state.modalProduct} onClose={() => { this.onCloseModalProduct() }} >
                                        <div class="add-new">
                                            <h2 class="text-center w-full">{product.Id ? "Edit product ID= " + product.Id : "Add new product"}</h2>
                                            <div class="form-group">
                                                <label for="productName">Product name</label>
                                                <input value={product.Name} onChange={(e) => { this.nameChange(e) }} type="text" class="form-control" id="productName" placeholder="Enter product name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="productPrice">Product price</label>
                                                <input value={product.Price} onChange={(e) => { this.priceChange(e) }} type="number" class="form-control" id="productPrice" placeholder="Price" />
                                            </div>
                                            <div class="form-group w-full">
                                                <label for="productCategory">Product's category</label>
                                                <Dropdown options={cateOption} onChange={(e) => { this.selectCatelogy(e) }} value={this.state.selectedCatelogy} placeholder="Select product's category" />
                                            </div>
                                            <div class="form-group w-full">
                                                <label for="productCategory">Product's brand</label>
                                                <Dropdown options={brandOption} onChange={(e) => { this.selectBrand(e) }} value={this.state.selectedBrand} placeholder="Select product's brand" />
                                            </div>
                                            <div class="form-group w-full">
                                                <ImageUploading
                                                    onChange={(e) => this.imageChange(e)}
                                                    acceptType={["jpg", "gif", "png"]}
                                                    defaultValue={product.ImageFile ? [{ dataURL: product.ImageFile.ImageUrl }] : []}
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
                                            <button onClick={() => this.submitProduct()} class="btn btn-primary">Submit</button>
                                        </div>
                                    </Modal>

                                </div>
                                <div class="tab-pane fade" id="v-pills-customer" role="tabpanel" aria-labelledby="v-pills-customer-tab">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Email</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Phone number</th>
                                                <th scope="col">Admin</th>
                                                <th scope="col">Edit/ Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userList ? userList.map((cus, i) => (
                                                <tr>
                                                    <th scope="row">{cus.Email}</th>
                                                    <td>{cus.Name}</td>
                                                    <td>{cus.PhoneNumber}</td>
                                                    <td>{cus.UserType ? "Yes" : "No"}</td>
                                                    <td>
                                                        <button class="btn btn-primary">Edit</button>
                                                        <button class="btn btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            )) : null}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-cate" role="tabpanel" aria-labelledby="v-pills-cate-tab">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Sport</th>
                                                <th scope="col">Edit/ Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cateList ? cateList.map((cate, i) => (
                                                <tr>
                                                    <th scope="row">{cate.Id}</th>
                                                    <td>{cate.Name}</td>
                                                    <td>{cate.Sport ? cate.Sport.Name : "N/A"}</td>
                                                    <td>
                                                        <button class="btn btn-primary" onClick={() => { this.onOpenModalUpdateCate(cate) }}>Edit</button>
                                                        <button class="btn btn-danger" onClick={()=>{this.deleteCate(cate.Id)}}>Delete</button>
                                                    </td>
                                                </tr>
                                            )) : null}
                                        </tbody>
                                    </table>
                                    <button onClick={() => this.onOpenModalCreateCate()} class="btn btn-danger">Create New Category</button>
                                    <br />
                                    <Modal center open={this.state.modalCate} onClose={() => { this.onCloseModalCate() }} >
                                        <div class="add-new">
                                            <h2 class="text-center w-full">{cate.Id ? "Edit category ID= " + cate.Id : "Add new category"}</h2>
                                            <div class="form-group">
                                                <label for="productName">Category name</label>
                                                <input value={cate.Name} onChange={(e) => { this.cateNameChange(e) }} type="text" class="form-control" id="productName" placeholder="Enter category's name" />
                                            </div>
                                            <div class="form-group w-full">
                                                <label for="productCategory">Category's sport</label>
                                                <Dropdown options={sportOption} onChange={(e) => { this.selectSport(e) }} value={this.state.selectedSport} placeholder="Select category's sport" />
                                            </div>

                                            <button onClick={() => this.submitCate()} class="btn btn-primary">Submit</button>
                                        </div>
                                    </Modal>
                                    <br />
                                </div>
                                <div class="tab-pane fade" id="v-pills-sport" role="tabpanel" aria-labelledby="v-pills-sport-tab">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Edit/ Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sportList ? sportList.map((spo, i) => (
                                                <tr>
                                                    <th scope="row">{spo.Id}</th>
                                                    <td>{spo.Name}</td>
                                                    <td>{spo.Categories ? spo.Categories.map((cate) => (
                                                        <p>{cate.Name}</p>
                                                    )) : null}</td>
                                                    <td>
                                                        <button class="btn btn-primary" onClick={() => { this.onOpenModalUpdateSport(spo) }}>Edit</button>
                                                        <button class="btn btn-danger" onClick={() => this.deleteSport(spo.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )) : null}
                                        </tbody>
                                    </table>
                                    <br />
                                    <Modal center open={this.state.modalSport} onClose={() => { this.onCloseModalSport() }} >
                                        <EditForm name="Sport" properties={["Name"]} submit={()=>this.editSport()} />
                                    </Modal>
                                    <br />
                                </div>
                                <div class="tab-pane fade" id="v-pills-brand" role="tabpanel" aria-labelledby="v-pills-sport-brand">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Brand name</th>
                                                <th scope="col">Edit/ Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {brandList ? brandList.map((brand, i) => (
                                                <tr>
                                                    <th scope="row">{brand.Id}</th>
                                                    <td>{brand.Name}</td>
                                                    <td>
                                                        <button class="btn btn-primary">Edit</button>
                                                        <button class="btn btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            )) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));