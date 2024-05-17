import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [param1, setParam1] = useState('');
    const [param2, setParam2] = useState('');
    const [output, setOutput] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/run-octave', { param1, param2 });
            console.log(response)
            setOutput(response.data.output);
        } catch (error) {
            setOutput(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>GNU Octave Runner</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={param1}
                        style={{padding:'10px',borderRadius:'7px',outline:'none',border:'none'}}
                        onChange={(e) => setParam1(e.target.value)}
                        placeholder="Parameter 1"
                    />
                    <br />
                    <input
                        type="text"
                        value={param2}
                        style={{padding:'10px',borderRadius:'7px',outline:'none',border:'none'}}
                        onChange={(e) => setParam2(e.target.value)}
                        placeholder="Parameter 2"
                    />
                    <br />
                    <button type="submit" style={{padding:'10px',cursor:'pointer',backgroundColor:'#'}}>Run Script</button>
                </form>
                <h2>Output:</h2>
                <p>{output}</p>
            </header>
        </div>
    );
}

export default App;
