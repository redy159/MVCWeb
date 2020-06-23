import React from 'react';
import ReactDOM from 'react-dom';
import {Input, TextArea, GenericInput} from 'react-text-input';

class ListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <Input/>
            </React.Fragment>
            )
    }
}

ReactDOM.render(<ListProduct />, document.getElementById("root"));