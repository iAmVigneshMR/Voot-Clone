import React, { Fragment } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { withRouter } from 'react-router-dom';

const SliderComponent = (props) => {
    // let { poster } = props.location.state;
    // console.log(props);
    return (
        <Fragment>
            <Carousel infiniteLoop centerMode autoPlay>
            <div>
                <img src="slider1.jpeg" />
                {/* <p className="legend"></p> */}
            </div>
            <div>
                <img src="slider2.jpeg" />
                {/* <p className="legend"></p> */}
            </div>
            <div>
                <img src="slider3.jpeg" />
                {/* <p className="legend"></p> */}
            </div>
            <div>
                <img src="slider4.jpeg" />
                {/* <p className="legend"></p> */}
            </div>
            <div>
                <img src="slider5.jpeg" />
                {/* <p className="legend"></p> */}
            </div>
            <div>
                <img src="slider6.jpeg" />
                {/* <p className="legend"></p> */}
            </div>
           
        </Carousel>
        </Fragment>
    );
}

export default withRouter(SliderComponent);
