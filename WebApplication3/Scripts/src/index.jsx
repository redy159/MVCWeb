import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test.jsx';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Test/>
                <div className="commentBox">Hello, world! I</div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));