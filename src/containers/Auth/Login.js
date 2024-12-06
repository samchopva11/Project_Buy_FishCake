import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import {handleLoginApi} from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password: '',
            isShowPassword: false,
        }
    }

    handleOnChangeUsername = (event) =>{
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        console.log('username: ', this.state.username, 'password: ', this.state.password)
        console.log('all state', this.state)
        try{
            await handleLoginApi(this.state.username, this.state.password);
        }
        catch(error){
            console.log(error)
        }
        
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }






    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username' value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input  type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password' value={this.state.password} onChange={(event) => {this.handleOnChangePassword(event)}} ></input>
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    
                                    <i class={this.state.isShowPassword  ? 'far fa-eye' : 'far fa-eye-slash' }></i>
                                </span>
                                
                            </div>
                            
                        </div>
                        <div className='col-12 text-center '>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12 '>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login text-center'>
                            <i className="fab fa-google google"></i>
                            <i class="fab fa-facebook facebook"></i>
                        </div>
                            

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
