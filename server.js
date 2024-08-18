const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const conn = mysql.createConnection({
    host: "bgjo6wpqzweglg5jn2m0-mysql.services.clever-cloud.com",
    user: "uxkdlftngtwx5f5s",
    password: "63qSLEZl49b84Ig7EnyK",
    database: "bgjo6wpqzweglg5jn2m0"
});

conn.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('Connection successful!');
    }
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Professional Form with Enhanced Notification and Cookie Consent</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <style>
            body {
                background-color: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: 'Arial', sans-serif;
            }
            .form-container {
                background-color: #ffffff;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                width: 100%;
                max-width: 500px;
                animation: slideIn 1s ease;
                position: relative;
                overflow: hidden;
            }
            .form-container h3 {
                font-weight: 600;
                margin-bottom: 30px;
                color: #333;
                text-align: center;
                animation: fadeIn 1s ease-in-out;
            }
            .form-group label {
                font-weight: 500;
                color: #555;
                animation: fadeInUp 0.6s ease-in-out;
            }
            .form-group input {
                border: 1px solid #ddd;
                border-radius: 6px;
                padding: 10px;
                font-size: 16px;
                animation: fadeInUp 0.8s ease-in-out;
            }
            .form-group input:focus {
                border-color: #007bff;
                box-shadow: none;
            }
            .btn-primary {
                background-color: #007bff;
                border: none;
                border-radius: 6px;
                padding: 10px 20px;
                font-weight: 500;
                transition: background-color 0.3s ease, transform 0.3s ease;
                animation: fadeInUp 1s ease-in-out;
            }
            .btn-primary:hover {
                background-color: #0056b3;
                transform: scale(1.05);
            }
            .loader {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                border: 5px solid rgba(0, 123, 255, 0.1);
                border-top: 5px solid #007bff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                transform: translate(-50%, -50%);
                display: none;
            }
            .alert {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.5s ease, visibility 0.5s ease;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
            }
            .alert.show {
                opacity: 1;
                visibility: visible;
            }
            .alert-success {
                background-color: #28a745;
                color: #fff;
            }
            .alert-error {
                background-color: #dc3545;
                color: #fff;
            }
            .alert i {
                margin-right: 10px;
                font-size: 1.2em;
            }
            .cookie-consent {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                z-index: 9999;
                display: none;
            }
            .cookie-consent p {
                margin-bottom: 10px;
            }
            .cookie-consent button {
                background-color: #007bff;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            .cookie-consent button:hover {
                background-color: #0056b3;
            }
            @keyframes slideIn {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <!-- Notification Alerts -->
        <div class="alert alert-success" id="notification" style="display:none;">
            <i class="fas fa-check-circle"></i>
            Data Added Successfully!
        </div>
        <div class="alert alert-error" id="notification-error" style="display:none;">
            <i class="fas fa-exclamation-triangle"></i>
            Data Not Added!
        </div>

        <!-- Cookie Consent Popup -->
        <div class="cookie-consent" id="cookieConsent">
            <p>This website uses cookies to ensure you get the best experience on our website.</p>
            <button id="acceptCookies">Accept</button>
        </div>

        <div class="form-container">
            <div class="loader" id="loader"></div>
            <h3>Your Information</h3>
            <form id="infoForm" action="/submit" method="POST">
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" name="name" class="form-control" id="name" placeholder="Enter your name" required>
                </div>
                <div class="form-group">
                    <label for="qualification">Educational Qualifications</label>
                    <input type="text" name="education" class="form-control" id="qualification" placeholder="Enter your qualifications" required>
                </div>
                <div class="form-group">
                    <label for="phone">Telephone Number</label>
                    <input type="tel" name="telephone" class="form-control" id="phone" placeholder="Enter your telephone number" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" class="form-control" id="email" placeholder="Enter your email" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Submit</button>
            </form>
        </div>

        <!-- Bootstrap and jQuery JavaScript Libraries -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>

        <script>
            $(document).ready(function() {
                // Show notification if present
                const notification = $('#notification');
                const notificationError = $('#notification-error');

                // Form submission loader
                $('#infoForm').on('submit', function(e) {
                    $('#loader').show();
                });

                // Cookie consent handling
                if (!getCookie('cookieConsent')) {
                    $('#cookieConsent').show();
                }

                $('#acceptCookies').on('click', function() {
                    setCookie('cookieConsent', 'true', 365);
                    $('#cookieConsent').hide();
                });

                // Function to set a cookie
                function setCookie(name, value, days) {
                    const d = new Date();
                    d.setTime(d.getTime() + (days*24*60*60*1000));
                    const expires = "expires="+ d.toUTCString();
                    document.cookie = name + "=" + value + ";" + expires + ";path=/";
                }

                // Function to get a cookie
                function getCookie(name) {
                    const cname = name + "=";
                    const decodedCookie = decodeURIComponent(document.cookie);
                    const ca = decodedCookie.split(';');
                    for(let i = 0; i <ca.length; i++) {
                        let c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(cname) == 0) {
                            return c.substring(cname.length, c.length);
                        }
                    }
                    return "";
                }
            });
        </script>
    </body>
    </html>
    `);
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, education, telephone, email } = req.body;

    // SQL query to insert data into the tutors table
    const sql = `INSERT INTO tutors (name, education, telephone, email) VALUES (?, ?, ?, ?)`;
    conn.query(sql, [name, education, telephone, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.send(`
                <script>
                    alert('Data Not Added! Please try again.');
                    window.location.href = '/';
                </script>
            `);
        } else {
            console.log('Data added successfully:', result);
            res.send(`
                <script>
                    alert('Data Added Successfully!');
                    window.location.href = '/';
                </script>
            `);
        }
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
