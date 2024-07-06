import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import PasswordStrength, { calculatePasswordStrength } from './PasswordStrength';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordStrength = calculatePasswordStrength(password);
    if (passwordStrength < 4) {
      setError('Please choose a stronger password');
      return;
    }
    console.log('Form submitted', { email, password });
    e.Default()
  }

  useGSAP(() => {
    gsap.from('.glass', { opacity: 0, duration: 1, y: -50, ease: 'elastic' });
  }, []);

  return (
    <div className="center h-screen">
      <div className="ls-container glass">
          <h1 className="ls-h1">Sign Up</h1>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="ls-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={handleEmailChange}
                placeholder='Enter Email...' 
                className="ls-info" 
                required
              />            
              </div>
            <div>
              <label htmlFor="password" className="ls-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Enter Password...'
                className="ls-info"
                onChange={handlePasswordChange}
                value={password}
                required
              />
              <PasswordStrength password={password} />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="center">
              <button type="submit" className="ls-btn">
                Sign Up
                <FontAwesomeIcon icon={faSignIn} className="ml-2" />
              </button>
            </div>
          </form>
          <div className="flex items-center mt-2">
            <div className="flex-grow border-t border-amber-500"></div>
            <span className="mx-2 text-amber-500">OR</span>
            <div className="flex-grow border-t border-amber-500"></div>
          </div>
          <div className="center flex-col p-1">
            <div className="flex space-x-4 mt-1">
              <button className="hover:text-amber-500">
                <FontAwesomeIcon icon={faApple} style={{ fontSize: '28px' }}/>
              </button>
              <button className="hover:text-amber-500">
                <FontAwesomeIcon icon={faGoogle} style={{ fontSize: '25px' }}/>
              </button>
              <button className="hover:text-amber-500">
                <FontAwesomeIcon icon={faGithub} style={{ fontSize: '25px' }}/>
              </button>
            </div>
          </div>
          <div className="center">
            <p className="text-white">Already have an account?</p>
            <a href="/login" className="text-amber-500 hover:text-amber-700 px-1">Login</a>
          </div>
      </div>
    </div>
  )
}

export default SignUp


