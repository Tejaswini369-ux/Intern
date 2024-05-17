const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/run-octave', (req, res) => {
    const { param1, param2 } = req.body;

    // Command to run the Octave script with parameters
    const command = `octave --eval "script(${param1}, ${param2})"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: stderr });
        } else {
            console.log(stdout)
            res.send({ output: stdout });
        }
    });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
