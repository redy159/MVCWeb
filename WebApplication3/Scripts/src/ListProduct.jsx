import React from 'react';
import ReactDOM from 'react-dom';
import MuiTable from 'mui-table';


class ListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }



    componentDidMount() {
        fetch('/api/Manager/GetAll', {
            method: "Get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify(this.state.data)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data })
            });
    }


    render() {
        if (!this.state.data) return null
        this.state.data.forEach(s => {
            s.brandName = s.Brand.Name;
            s.categoryName = s.Category.Name;
        })

        return (
            <React.Fragment>
                <table>
                    <th>
                        
                    </th>
                </table>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<ListProduct />, document.getElementById("root"));