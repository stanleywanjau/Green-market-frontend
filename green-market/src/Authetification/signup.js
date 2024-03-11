import React, {useState} from 'react'; 

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //add authentication 

    
    console.log(`Email: ${email}, Password: ${password}, Mode: Signup`);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{' '}
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleToggle}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm; 

