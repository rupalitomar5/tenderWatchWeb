import React from 'react';
import FacebookLogin from 'react-facebook-login';

const Facebook = (props) => (<FacebookLogin
    appId="419928815108640"
    autoLoad={false}
    fields="name,email,picture"
    scope="public_profile"
    callback={props.facebookLoginMethod}
    cssClass="btn fa-socialBtn fa fa-facebook fa-2x"
/>);

export default Facebook;

