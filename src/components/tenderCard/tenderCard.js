import React from 'react';
import './tendercard.css';

const TenderCard = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="image">
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/tenderwatch/tenderimages/image_1524309093130.jpg"/>
                        </div>
                        <div className="text-box">
                            <ul className="text-center">
                                <li><a href="#"><strong>Name: </strong> Evin Luies</a></li>
                                <li><a href="#"><strong>Title: </strong> Evin Luies</a></li>
                                <li><a href="#"><strong>Exp_Day: </strong> 29 Days</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TenderCard;

//https://s3.ap-south-1.amazonaws.com/tenderwatch/tenderimages/image_1524309093130.jpg