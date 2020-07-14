import React from 'react';
import ReactDOM from 'react-dom'

class Footer extends React.Component {  
    constructor(props)
    {
        super(props)
        this.state = {}     
    }
    render() {
        const { login, sign } = this.state;
       
        if (!this.state.data) return null;
        return (
            <React.Fragment>
                <div class="footer">
                    <p>SE310.K21</p>
                    <p>16521540 - 16520299 - /Phuoc/</p>
                </div>
        </React.Fragment>
        )
    }
}

ReactDOM.render(<Header />, document.getElementById("header"));