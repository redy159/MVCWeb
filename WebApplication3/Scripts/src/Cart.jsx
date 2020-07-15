import React from 'react';
import ReactDOM from 'react-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { login, sign } = this.state;

        //if (!this.state.data) return null;
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Cart />, document.getElementById("root"));