import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response);
};


    const Facebook = () => (<FacebookLogin
        appId="250693088764491"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends,user_actions.books"
        callback={responseFacebook}
    />);

export default Facebook;

