import React from 'react';
import '../Login/login.css';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTenderMethod} from '../../actionMethods/tenderActionMethods';

class Tender extends React.Component {
    constructor(props) {
        debugger;
        super();
        this.state = {
            id: props.location.pathname.split('/').pop()
        }
    }

    componentDidMount() {
        this.props.getTenderMethod(this.state.id);
    }

    render() {
        debugger;
        return (
            <div className="login">
                <div className="login-content">
                    <div className="login-logo">
                        <h3 className='colorText'>Tender:</h3>
                    </div>
                    <div className="login-form">
                        <ListGroup>

                            <ListGroupItemHeading className='colorText'>Tender Image</ListGroupItemHeading>
                            <ListGroupItemText>
                                <div className='smallImage'>
                                    <img src={this.props.tender && this.props.tender.tenderPhoto} onError={(e) => {
                                        e.target.src = '/images/picture.svg'
                                    }}/>
                                </div>
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Tender name:</ListGroupItemHeading>
                            <ListGroupItemText className='colorText'>
                                {this.props.tender && this.props.tender.tenderName}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Tender Description:</ListGroupItemHeading>
                            <ListGroupItemText className='colorText'>
                                {this.props.tender && this.props.tender.description}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Country:</ListGroupItemHeading>
                            <ListGroupItemText className='colorText'>
                                {this.props.tender && this.props.tender.country &&
                                <React.Fragment><img
                                    src={`data:image/png;base64,${this.props.tender.country.imageString}`} alt=''/>
                                    {this.props.tender.country.countryName}</React.Fragment>}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Category:</ListGroupItemHeading>
                            <ListGroupItemText>
                                {this.props.tender && this.props.tender.category && <React.Fragment>
                                    <img src={`data:image/png;base64,${this.props.tender.category.imgString}`} alt=''/>
                                    {this.props.tender.category.categoryName}</React.Fragment>}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Expiry Date:</ListGroupItemHeading>
                            <ListGroupItemText>
                                {this.props.tender && this.props.tender.expiryDate}
                            </ListGroupItemText>
                            <div style={{border:'1px solid black'}}/>
                            <h4>Client Details:</h4>
                            <div style={{border:'1px solid black'}}/>
                            <ListGroupItemHeading className='colorText'>Email:</ListGroupItemHeading>
                            <ListGroupItemText>
                                {this.props.tender && this.props.tender.email}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Contact no:</ListGroupItemHeading>
                            <ListGroupItemText>
                                {this.props.tender && this.props.tender.contactNo}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Landline:</ListGroupItemHeading>
                            <ListGroupItemText>
                                {this.props.tender && this.props.tender.landlineNo}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>Address:</ListGroupItemHeading>
                            <ListGroupItemText>
                                {this.props.tender && this.props.tender.address}
                            </ListGroupItemText>
                            <ListGroupItemHeading className='colorText'>City:</ListGroupItemHeading>
                            <ListGroupItemText>
                                {this.props.tender && this.props.tender.city}
                            </ListGroupItemText>
                        </ListGroup>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {tender: state.tenders.current_tender}
};
const mapDispatchToProps = (dispatch) => bindActionCreators({getTenderMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Tender);