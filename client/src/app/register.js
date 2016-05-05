import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';


const styles = {
    container: {
        //textAlign: 'center',
    },
};

class RegisterForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            usernameErrorText: '',
            passwordErrorText: '',
        }
    }

    beforeSubmit(e){
        let valid = {
            username: !!this.refs.usernamerTextField.getValue(),
            password: !!this.refs.passwordTextField.getValue(),
        }

        this.setState({
            usernameErrorText: valid.username ? '' : 'Jméno musí být vyplněné',
            passwordErrorText: valid.password ? '' : 'Heslo musí být vyplněné',
        })

        if(!valid.username || !valid.password) e.preventDefault()
    }

    toLogin(){
        window.location = '/login'
    }

    onChangeUsername(e){
        this.setState({
            usernameErrorText: '',
        })
    }

    onChangePassword(e){
        this.setState({
            passwordErrorText: '',
        })
    }

    render() {
        
        return (
            <form  className='centerVH' style={{textAlign:'center'}} action='/register' method='post'>
                <h2 >Registrace</h2>
                <div style={{height: '85px'}}>
                    <TextField
                        name="username"
                        ref='usernamerTextField'
                        floatingLabelText="Uživatelské jméno"
                        onChange={this.onChangeUsername.bind(this)}
                    errorText={this.state.usernameErrorText}
                  />
              </div>
              <div style={{height: '85px', marginBottom: '18px'}}>
                <TextField
                    name="password"
                    ref='passwordTextField'
                    floatingLabelText="Heslo"
                    type="password"
                    onChange={this.onChangePassword.bind(this)}
                    errorText={this.state.passwordErrorText}
                  />
              </div>
            <FlatButton label="Přihlášení" secondary={true} onClick={this.toLogin}/>

            <RaisedButton label="Potvrdit" secondary={true} type='submit' onClick={this.beforeSubmit.bind(this)}/>
        </form>
        );
            }
}

ReactDOM.render(<RegisterForm />, document.getElementById('app'));
