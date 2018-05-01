import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../index.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarShow:true,
            activeLink:'',
            activeclass:`nav-item active`,
            expanded:false
        };
    }
    activeLink=(e)=>{
        let target=e.target.name;
        this.setState({
            activeLink:target
        });
    };

    render() {
        return (
            <div className={"col-md-2 col-xs-12 sidebar bg-white hide"} id="sidebar-wrapper">
                {/*<a className="pull-left show-menu" onClick={this.props.toggleSidebar}>
                  <i className="fa fa-bars fa-2x"/>
              </a>*/}
                <Link className="" to="/">
                    <img className="logo-sidebar" src="https://s3.ap-south-1.amazonaws.com/tenderwatch/logo3%401024.png" alt="Tender watch" width="150"/>
                </Link>
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li name="Home" className={this.props.active === 'Home' ? "nav-item active" :"nav-item active"} ><Link className="nav-link" onClick={this.activeLink}  name="Home" to="/"><i className="fa fa-home"/><span> Home </span></Link></li>
                        <li name="uploadTender" className={this.props.active === 'uploadTender' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="uploadTender" to="/uploadTender"><i className="fa fa-upload"/> <span> Upload Tender </span> </Link></li>
                        <li name="notification" className={this.props.active === 'notification' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="notification" to="/notification"><i className="fa fa-bell"/><span> Notification </span></Link></li>
                        <li name="contactSupportTeam" className={this.props.active === 'contactSupportTeam' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="contactSupportTeam" to="/contactSupport"><i className="fa fa-headphones"/><span> Contact Support Team </span></Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

/*
const mapStateToProps = (state) => {
    return {
       sidebarShow:state.classesChange.sidebarShow
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({toggleSidebar,openSidebar,closeSidebar}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));*/
export default SideBar;
