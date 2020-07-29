import React, { Component } from 'react'
import FacebookLogin from "react-facebook-login";

export default class SignInPage extends Component {
    render() {
        return (
            <div>
                {<FacebookLogin
                    autoLoad={true}
                    appId="323988882097127"
                    fields="name,email,picture"
                    callback={(resp) => this.props.responseFacebook(resp)}
                />}
            </div>
        )
    }
}
