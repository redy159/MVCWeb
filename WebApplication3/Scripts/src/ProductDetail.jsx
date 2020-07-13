import React from 'react';
import ReactDOM from 'react-dom';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.param
        }
    }

    componentDidMount() {
        fetch("/api/Manager/GetProductById?id=" + this.state.id, {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        if (!this.state.data) return null;
        console.log(this.state.data)
        return (
            <div></div>
            )
    }
}

const param = document.getElementById("root").getAttribute('data-param');
ReactDOM.render(<ProductDetail param={param} />, document.getElementById("root"));