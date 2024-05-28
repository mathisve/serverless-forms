import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const submitEmail = (event) => {
    event.preventDefault();
  
    console.log(email);

    if (email === "") {
      return
    }

    axios.post('https://eqo973gme9.execute-api.us-east-1.amazonaws.com/email', 
      JSON.stringify({"email": email}),
      {headers: {'Content-Type': 'application/json'}})
    .then((resp) => {
      setSubmitted(true);
    }).catch((resp) => {
      setSubmitted(false)
      setErrorOccurred(true);
    });

    setEmail('');
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div className='text-8xl'>
          <a href="/">ACME Inc.</a>
        </div>
        <div className='text-2xl text-slate-400'>
          We do what others do too!
        </div>
        <div className='mt-5'>
          {!submitted ? (
            <form className='' onSubmit={submitEmail} onChange={(e) => setEmail(e.target.value)}>
              <div className='float-left text-s text-gray-500'>
                Sign up for our wait list!
              </div>
              <div className=''>
                <input className='shadow rounded-xl appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-5 p-2' name="email" type="email" placeholder='Email' defaultValue={email}></input>
                <button className="rounded-xl shadow-lg bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline pl-8 pr-8 p-1.5" type="submit">Submit</button>
              </div>
              {errorOccurred && (
                 <p className="mt-4 text-red-500">
                 Something went wrong, try again!</p>
              )}
            </form>
          ) : (
            <p className="mt-4 text-green-500">
                Thank you for submitting your email.</p>
            )}
        </div>
      </header>
    </div>
  );
}

export default App;
