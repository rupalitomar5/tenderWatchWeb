import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
                <Link className="navbar-brand hd-logo col-lg-2 mr-0" to="/">
                    <img src="logo.png" alt="" width="150"/>
                </Link>
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li name="Home" className={this.props.active === 'Home' ? "nav-item active" :"nav-item"} ><Link className="nav-link" onClick={this.activeLink}  name="Home" to="/"><i className="fa fa-home"></i> <span> Home </span></Link></li>
                        <li name="uploadTender" className={this.props.active === 'uploadTender' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="uploadTender" to="/uploadTender"><i className="fa fa-upload"></i> <span> Upload Tender </span> </Link></li>
                        <li name="editProfile" className={this.props.active === 'editProfile' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="editProfile" to="/editProfile"><i className="fa fa-user"></i> <span> Edit Profile </span></Link></li>
                        <li name="changePassword" className={this.props.active === 'changePassword' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="changePassword" to="/changePassword"><i className="fa fa-lock"></i> <span> Change Password </span></Link></li>
                        <li name="notification" className={this.props.active === 'notification' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="notification" to="/notification"><i className="fa fa-bell"></i> <span> Notification </span></Link></li>
                        <li name="contactSupportTeam" className={this.props.active === 'contactSupportTeam' ? "nav-item active" :"nav-item"} onClick={this.activeLink}><Link className="nav-link"  name="contactSupportTeam" to="/contactSupportTeam"><i className="fa fa-headphones"></i> <span> Contact Support Team </span></Link></li>
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
