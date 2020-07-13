import React from 'react';
//import './../../../Content/product.css'
export default class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }
    render() {
        const { data } = this.props;
        return (
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval="3000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="./../../../Content/images/banner-101.jpg" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="./../../../Content/images/banner-102.jpg" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="./../../../Content/images/banner-101.jpg" alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="false"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="false"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}
