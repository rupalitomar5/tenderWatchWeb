import React from 'react';
import './tendercard.css';
import {NavLink} from 'react-router-dom';
import noImage from '../../components/tenderForm/picture.svg'
import cross from '../../images/cross.svg'


const TenderCard = (props) => {
    return (
                <div className="col-md-3">
                    <div className="card">
                        {
                            props.title !=='favorite' && <div className="cross-btn" onClick={props.deleteMethod}>
                                <img id={props._id} name={props.tenderName} src={cross} />
                            </div>
                        }
                        <div className="image">
                            <img
                                id={props._id}
                                src={props.tenderPhoto}
                                onError={(e)=>{e.target.src=noImage}}
                                alt=''
                            />
                        </div>
                        <div className="text-box">
                            <ul className="text-center">
                                <li><NavLink to={`/tender/${props._id}`}><strong>Name: </strong>{props.tenderName}</NavLink></li>
                                <li><NavLink to={`/tender/${props._id}`}><strong>Exp_Day: </strong> {props.tenderExpiryDate}</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
    )
};

export default TenderCard;

//https://s3.ap-south-1.amazonaws.com/tenderwatch/tenderimages/image_1524309093130.jpg