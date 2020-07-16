import React from 'react';
import ReactDOM from 'react-dom'
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import './../../../Content/header.css'
class Header extends React.Component {  
    constructor(props)
    {
        super(props)
        this.state = {
            sign: false,
            login: false,
           
        };  
    }


    componentDidMount() {
        fetch('/api/Manager/GetSportMenu', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data=> this.setState({data:data}));
        
    }

    onOpenModal() {
        this.setState({ sign: true });
    };

    onOpenModalLogin () {
        this.setState({ login: true });
    };

    onCloseModal () {
        this.setState({ sign: false });
    };

    onCloseModalclose (){
        this.setState({ login: false });
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    
    };  

    handleLogin() {
        console.log("Submitting login");
        console.log("email : " + document.getElementById("loginEmail").value);
        console.log("pass : " + document.getElementById("loginPass").value);
    };
    handleSignup() {
        console.log("Submitting sign up");
        console.log("email : " + document.getElementById("signupEmail").value);
        console.log("pass : " + document.getElementById("signupPass").value);
        console.log("username : " + document.getElementById("signupName").value);
        console.log("phone : " + document.getElementById("signupPhonenumber").value);
    };
    render() {
        const { login, sign } = this.state;
       
        if (!this.state.data) return null;
        return (
            <React.Fragment>
 
                <div class="container flex flex-row pl-3 pr-3">
                    <div class="logo">
                        <a href="/home"><h2>Sport <br />Equipment</h2></a>
                    </div>
                    <button type="button" class="btn btn-light log-in"onClick={() => { this.onOpenModalLogin() }}>Login</button>
                    <button type="button" class="btn btn-light sign-up" onClick={() => { this.onOpenModal() }}>Sign Up</button>
                    <a class="d-flex" href="/home/Cart">
                        <img class="d-block" src="./../../../../Content/images/cart.svg" alt="Cart" width="30" style={{margin: "auto 5px"}} />
                    </a>           
                </div>
                <div class="navigation">
                    <div class="container">
                        <div class="row">
                            <ul class="col flex justify-content-between">
                                {this.state.data.map((item) => (
                                    <li class="dropdown">
                                        <a href={"/home/ProductByCategory?sportId="+item.Id}><strong>{item.Name}</strong></a>
                                        <ul class="dropdown-content">
                                            {item.Categories.map((cate) => (
                                                <li><a href={"/home/ProductByCategory?cateId="+cate.Id}>{cate.Name}</a></li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sign up model */}

                <Modal center open={sign} onClose={() => { this.onCloseModal() }} >
                    <div className="modal-body">
                        <h2>Sign up<span> Free!</span></h2>
                        <form className="form-signin" novalidate="novalidate">
                        <div className="form-group">
                            <label for="signupEmail">Email</label>
                            <input class="form-control" type="email" id="signupEmail" placeholder="E-mail"  aria-required="true"/>
                        </div>
                        <div className="form-group">
                            <label for="signupPass">Password</label>
                            <input class="form-control" type="password" id="signupPass" placeholder="Password" required="" aria-required="true"/>
                        </div>
                        <div className="form-group">
                            <label for="signupName">User name</label>
                            <input class="form-control" type="password" id="signupName" placeholder="User name" required="" aria-required="true"/>
                        </div>
                        <div className="form-group">
                            <label for="signupPhonenumber">Phone number</label>
                            <input class="form-control" type="password" id="signupPhonenumber" placeholder="09012333333" required="" aria-required="true"/>
                        </div>
                        <input className="btn btn-primary w-full" type="button" value="Sign Up" onClick={() => this.handleSignup()} />
                        </form>
                    </div>
                </Modal>

                {/* <!-- signUp End -->
                  <!-- login --> */}

                <Modal open={login} onClose={()=> this.onCloseModalclose()}>

                    <div className="modal-body">
                        <h2 class="text-center" style={{margin: "0"}}>Login</h2>
                        <form className="form-signin" novalidate="novalidate">
                            <div className="form-group">
                                <label for="loginEmail">Email</label>
                                <input class="form-control" type="email" id="loginEmail" placeholder="E-mail"  aria-required="true"/>
                            </div>
                            <div className="form-group">
                                <label for="loginPass">Password</label>
                                <input class="form-control" type="password" id="loginPass" placeholder="Password" required="" aria-required="true"/>
                            </div>
                            <input className="btn btn-primary w-full" type="button" value="Login" onClick={() => this.handleLogin()} />
                        </form>
                    </div>
                </Modal>
        </React.Fragment>
        )
    }
}

ReactDOM.render(<Header />, document.getElementById("header"));