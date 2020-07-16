import React from 'react';
import './../../../Content/product.css'
export default class EditForm extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {}
    }
    handleEdit() {
        console.log("Edit "+ this.props.name);
        this.props.properties.forEach(element => {
            console.log(element + " : " + document.getElementById(element+ "EditName").value);
        });
        //call father edit
    }
    render() {
        const { name, properties } = this.props;
        return (
        <div>
                <div className="modal-body">
                    <h2>Edit {name}</h2>
                    <form className="form-signin" novalidate="novalidate">
                        {properties? properties.map((prop) => (
                            <div className="form-group">
                                <label for={prop +"EditName"}>{prop}</label>
                            <input class="form-control" type="email" id={prop +"EditName"}  aria-required="true"/>
                        </div>
                        )):null}
                        <input className="btn btn-primary w-full" type="button" value="Sign Up" onClick={() => this.handleEdit()} />
                    </form>
                </div>
        </div>
        )
    }
}
