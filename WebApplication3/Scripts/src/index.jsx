import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Component/test.jsx';
import Header from './Component/Header.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "Testing2",
                price: 3,
                categoryId:1,
            },
            test: {
                Id: 9,
                Name: "test",
                Price: 3000
            }
        }
    }

    componentDidMount() {
        fetch('/api/Manager/AddProduct', {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.data)
        })
            .then(response => {response.text() ? response.json(): {}});
    }

    render() {
        console.log(this.state.data);
        const { data } = this.state;
        return (
            <React.Fragment>
                <Test/>
                <Header/>
                <div className="commentBox">Hello, world! I</div> 
                <div>{data.ID}</div>
                <div>{data.Name}</div>
                <div>{data.Price}</div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));