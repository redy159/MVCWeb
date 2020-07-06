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
    }

    render() {
        console.log(this.state.data);
        const { data } = this.state;
        return (
            <React.Fragment>
                <Header/>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));