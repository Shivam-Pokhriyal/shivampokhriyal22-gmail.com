import React from 'react';
import SignIn from '../../Components/sign-in/sign-in.component.jsx';
import SignUp from '../../Components/sign-up/sign-up.component.jsx';
import './sign-in-and-sign-up.styles.scss'

const SignInAndSignUpPage=()=>(
    <div className='sign-in-and-sign-up'>
        <SignIn/>
        <SignUp/>
    </div>
);

export default SignInAndSignUpPage;