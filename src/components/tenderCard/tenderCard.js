import React from 'react';
import './tendercard.css';
import {NavLink} from 'react-router-dom';
import noImage from '../../components/tenderForm/picture.svg'


const TenderCard = (props) => {
    return (
                <div className="col-md-3">
                    <div className="card">
                        <div className="cross-btn" onClick={props.deleteMethod}>
                            <img id={props._id} name={props.tenderName} src='images/cross.svg' />
                        </div>
                        <div className="image">
                            <img
                                id={props._id}
                                src={props.tenderPhoto}
                                onError={(e)=>{e.target.src=noImage}}
                            />
                        </div>
                        <div className="text-box">
                            <ul className="text-center">
                                <li><NavLink to={`/tender/${props._id}`}><strong>Name: </strong>{props.tenderName}</NavLink></li>
                               {/* <li><NavLink to={`/tender/${props._id}`}><strong>Title: </strong> {props.tenderDescription}</NavLink></li>*/}
                                <li><NavLink to={`/tender/${props._id}`}><strong>Exp_Day: </strong> {props.tenderExpiryDate}</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
    )
};

export default TenderCard;

//https://s3.ap-south-1.amazonaws.com/tenderwatch/tenderimages/image_1524309093130.jpg