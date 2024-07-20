import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faSignIn, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      console.log('Login successful');
      navigate("/dashboard");
    } else {
      console.error('Login failed:', data.message);
      setError(data.message);
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const buttonId = e.currentTarget.id;
    const authUrl = buttonId === 'discord' 
      ? 'http://localhost:5001/auth/discord' 
      : 'http://localhost:5001/auth/google';
    
    const authWindow = window.open(authUrl, '_blank', 'width=500,height=600');
    
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:5001') return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        console.log('Authentication successful');
        authWindow.close();
        navigate("/");
      } else if (event.data.type === 'AUTH_FAILURE') {
        console.log('Authentication failed');
        setError('Authentication failed')
        authWindow.close();
      }
    }, false);
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useGSAP(() => {
    gsap.from('.glass', { opacity: 0, duration: 1, y: -50, ease: 'elastic' });
  }, []);

  return (
    <div className="center h-screen">
      <div className="ls-container glass">
        <h1 className="ls-h1">Login</h1>
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder='Enter Password...'
                className="ls-info w-full pr-10"
                onChange={handlePasswordChange}
                value={password}
                required
              />
              <button 
                type="button" 
                onClick={toggleShowPassword} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5"
              >
                {password.length > 0 && <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='text-white/80'/>}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="center">
            <button type="submit" className="ls-btn absolute mt-1">
              Login
              <FontAwesomeIcon icon={faSignIn} className="ml-2" />
            </button>
            <a href="/login/forgot-password" className="relative bottom-6 md:left-[105px] left-[70px] mt-2 mb-8 text-sm  text-amber-500 hover:text-amber-700">Forgot Password?</a>
          </div>
        </form>
        <div className="flex items-center mt-1">
          <div className="flex-grow border-t border-secondary_color"></div>
          <span className="mx-2 text-secondary_color">OR</span>
          <div className="flex-grow border-t border-secondary_color"></div>
        </div>
        <form>
          <div className="center flex-col p-1">
            <span className="text-white">Login with</span>
            <div className="flex mt-1">
              <button
                id='discord'
                type='submit'
                className="center border border-white/80 px-2 py-1 rounded-lg hover:border-secondary_color mr-2"
                onClick={handleAuth}
              >
                <FontAwesomeIcon icon={faDiscord} style={{ fontSize: '28px' }} />
              </button>
              <button
                id='google'
                type='submit'
                className="center border border-white/80 px-3 py-1 rounded-lg hover:border-secondary_color"
                onClick={handleAuth}
              >
                <FontAwesomeIcon icon={faGoogle} style={{ fontSize: '25px' }} />
              </button>
            </div>
          </div>
        </form>
        <div className="center mt-2">
          <p className="text-white">Don&apos;t have an account?</p>
          <a href="/signup" className="text-secondary_color hover:text-amber-700 px-1">Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default Login;
