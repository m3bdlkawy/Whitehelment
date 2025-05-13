const express = require("express");
const app = express();
const PORT = process.env.PORT || 4200;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Define teammates and Mohamed's DevOps journey
const teammates = [
    "Mostafa Mossa",
    {
        name: "Mohamed Abd El Kawy",
        journey: `
            <div style="text-align: left; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2>From Civil Engineering to DevOps</h2>
                <p><strong>Mohamed Abd El Kawy</strong> transitioned from structural design to cloud infrastructure, applying engineering precision to DevOps solutions.</p>
                <h3>Key Journey Points:</h3>
                <ul>
                    <li>🏗️ Civil Engineering background developed analytical problem-solving skills</li>
                    <li>🔄 Self-taught Linux, scripting, and cloud technologies</li>
                    <li>☁️ Currently automating deployments with Ansible, Kubernetes, and Docker</li>
                    <li>📊 Optimizing databases (PostgreSQL/Patroni) and monitoring (ELK, Prometheus/Grafana)</li>
                    <li>🚀 Built cloud-native DevOps pipelines using Terraform, Helm, and Jenkins</li>
                </ul>
                <p><em>"Building resilient systems, one pipeline at a time."</em></p>
            </div>
        `
    }
];

// Define the root route
app.get("/", (req, res) => {
    const teammatesList = teammates.map((member) => {
        if (typeof member === 'string') {
            return `<li>${member}</li>`;
        } else {
            return `<li>${member.name}<br>${member.journey}</li>`;
        }
    }).join("");

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello Class App</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
                img { max-width: 100%; height: auto; margin-bottom: 20px; }
                ul { list-style-type: none; padding: 0; }
                li { font-size: 1.2em; margin: 25px 0; text-align: center; }
                .journey-box { margin-top: 10px; }
            </style>
        </head>
        <body>
            <h1>Hello, Teammates!</h1>
            <img src="class-photo.jpg" alt="Class Photo">
            <h2>Team Members</h2>
            <ul>
                ${teammatesList}
            </ul>
        </body>
        </html>
    `);
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

module.exports = app;