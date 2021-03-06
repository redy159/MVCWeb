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
        }     
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
   

    render() {
        const { login, sign } = this.state;
       
        if (!this.state.data) return null;
        return (
            <React.Fragment>
 
                <div class="container flex flex-row pl-3 pr-3">
                    <div class="logo">
                        <a><h2>Sport <br />Equipment</h2></a>
                    </div>
                    <button type="button" class="btn btn-light log-in"
                        onClick={() => { this.onOpenModalLogin() }}
                        >
                        Đăng nhập
                    </button>
                    <button type="button" class="btn btn-light sign-up" onClick={() => { this.onOpenModal() }}>Đăng ký</button>           
                </div>
                <div class="navigation">
                    <div class="container">
                        <div class="row">
                            <ul class="col flex justify-content-between">
                                {this.state.data.map((item) => (
                                    <li class="dropdown">
                                        <a><strong>{item.Name}</strong></a>
                                        <ul class="dropdown-content">
                                            {item.Categories.map((cate) => (
                                                <li><a href="">{cate.Name}</a></li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sign up model */}

                <Modal open={sign} onClose={() => { this.onCloseModal() }} center>
                    <div className="modal-body">
                        <h2>Sign up<span> Free!</span></h2>
                        <form className="form-signin" novalidate="novalidate">
                        <div className="form-group">
                            <input className="form-control" type="text" name="name" id="name" placeholder="First Name" required="" autocomplete="off" aria-required="true" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autocomplete="off" aria-required="true" />
                        </div>
                        <div className="form-group">
                            <input type="password" name="pass" className="form-control" placeholder="Password" required="" autocomplete="off" aria-required="true" />
                        </div>
                        <input className="btn btn-light sign-up" type="button" value="Sign Up" />
                        </form>
                    </div>
                </Modal>

                {/* <!-- signUp End -->
                  <!-- login --> */}

                <Modal open={login} onClose={this.onCloseModalclose}>

                    <div className="modal-body">
                        <h2>Login and Get <span>Started</span></h2>
                        <span className="subtitle">Just fill in the form below</span>
                        <form className="form-signin" novalidate="novalidate">
                            <div className="form-group">
                                <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autocomplete="off" aria-required="true" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="pass" className="form-control" placeholder="Password" required="" autocomplete="off" aria-required="true" />
                            </div>
                            <input className="btn btn-light log-in" type="button" value="Login" />
                        </form>
                    </div>
                </Modal>
        </React.Fragment>
        )
    }
}

ReactDOM.render(<Header />, document.getElementById("header"));