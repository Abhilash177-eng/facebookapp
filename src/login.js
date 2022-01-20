import React from 'react'
import { useHistory } from 'react-router-dom';
function Login() {
    const history = useHistory();
    const navigateTo = () => history.push('/signup');
    const validateUser = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        fetch(`http://localhost:3000/signup?email=${email}&password=${password}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    history.push({ pathname: '/home', state: data });
                }
            })
    }
    return (
        <div>
            <div className='inputField'>
                <input id='email' type="text" className='inputclass' placeholder='Email adress or phone number' />
                <input id='password' type="password" className='inputclass' style={{ marginTop: "21%" }} placeholder='Password' />
                <button className='buttonclass' onClick={validateUser}>Log In</button>
                <a className='forgetpassword'>Forgotten password?</a>
                <div className='extraArrow'></div>
                <button className='newAccountButton' onClick={navigateTo}>Create New Account</button>
            </div>
            <div className='fbimg'>
                <img src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' className='fblogo' />
                <div className='contDiv'>
                    <h2 className='cont'>Facebook helps you connect and share with the people in your life.</h2>
                </div>
            </div>
        </div>
    )
}
export default Login