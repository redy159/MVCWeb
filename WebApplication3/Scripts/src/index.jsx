import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Id : 1,
                Name: "PS4",
                Price : 2000
            }
        }
    }

    componentDidMount() {
        fetch('/api/Manager/SendAndGetItem', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.data)
        })
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        console.log(this.state.data);
        const { data } = this.state;
        return (
            <React.Fragment>
                <Test/>
                <div className="commentBox">Hello, world! I</div>
                <div>{data.ID}</div>
                <div>{data.Name}</div>
                <div>{data.Price}</div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));