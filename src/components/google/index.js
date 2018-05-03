import React from 'react';
import GoogleLogin from 'react-google-login';
import {SHOW_MODAL} from "../../reducers/alertModal";

const responseGoogle = (response) => {
    console.log(response);
};

const GoogleComponent=(props)=>(<GoogleLogin
    id={props.id}
    className='btn fa-socialBtn fa fa-google fa-2x'
    clientId="153589139177-5k2g5pv0088mgaoob6t3jp5pvm2oqori.apps.googleusercontent.com"
    clientSecret="89FqTW6KJ6J9Y8a08_cxL9lT"
    buttonText=" login with Google"
    onSuccess={props.googleLoginMethod}
    onFailure={(err)=>""}
/>);

export default GoogleComponent;