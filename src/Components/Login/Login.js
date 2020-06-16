import React from 'react';
import Auth from './useAuth'
const Login = () => {

    const auth = Auth();
    // console.log(auth.user)
    const handleSignIn = () =>{
        auth.signInWithGoogle()
        .then(res =>{
            window.location.pathname = '/review'
        })
    }

    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/';
        })
    }

    return (
        <div>
            <h4>Hello dude</h4>
            {
                auth.user ? <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleSignIn}>Sign in with Google</button>

             }
        </div>
    );
};

export default Login;
