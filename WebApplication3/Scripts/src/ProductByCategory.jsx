import React from 'react';
import ReactDOM from 'react-dom';

class ProductByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModel: {
                CateId: 1,
                BrandId: 2,
            }
        }
    }

    componentDidMount() {
        fetch('/api/Manager/GetProductFilter', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.searchModel)
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

ReactDOM.render(<ProductByCategory />, document.getElementById("root"));