import React from 'react';
import './tendercard.css';

const TenderCard = (props) => {
    return (
                <div className="col-md-3">
                    <div className="card">
                        <div className="image">
                            <img
                                src={props.tenderPhoto}/>
                        </div>
                        <div className="text-box">
                            <ul className="text-center">
                                <li><a href="#"><strong>Name: </strong> {props.tenderName}</a></li>
                                <li><a href="#"><strong>Title: </strong> {props.tenderDescription}</a></li>
                                <li><a href="#"><strong>Exp_Day: </strong> {props.tenderExpiryDate}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
    )
};

export default TenderCard;

//https://s3.ap-south-1.amazonaws.com/tenderwatch/tenderimages/image_1524309093130.jpg