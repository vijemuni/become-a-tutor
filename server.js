const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'bgjo6wpqzweglg5jn2m0-mysql.services.clever-cloud.com',
  user: 'uxkdlftngtwx5f5s',
  password: '63qSLEZl49b84Ig7EnyK',
  database: 'bgjo6wpqzweglg5jn2m0'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Professional Form with Enhanced Notification and Cookie Consent</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <!-- Font Awesome for Icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <!-- Custom CSS for Professional Design and Animations -->
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
        <div class="alert" id="notification">
            <i id="notificationIcon"></i>
            <span id="notificationMessage"></span>
        </div>

     

        <div class="form-container">
            <div class="loader" id="loader"></div>
            <h3>Your Information</h3>
            <form id="infoForm">
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
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Disable specific keyboard shortcuts (like F12, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') || 
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });
</script>

        <script>
            $(document).ready(function() {
                // Form submission
                $('#infoForm').on('submit', function(e) {
                    e.preventDefault();
                    $('#loader').show();

                    $.ajax({
                        url: '/submit',
                        method: 'POST',
                        data: $(this).serialize(),
                        success: function(response) {
                            showNotification(response.type, response.message);
                            $('#loader').hide();
                            if (response.type === 'success') {
                                $('#infoForm')[0].reset();
                            }
                        },
                        error: function() {
                            showNotification('error', 'An error occurred. Please try again.');
                            $('#loader').hide();
                        }
                    });
                });

                // Show notification
                function showNotification(type, message) {
                    const notification = $('#notification');
                    notification.removeClass('alert-success alert-error').addClass('alert-' + type);
                    $('#notificationIcon').removeClass().addClass(type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle');
                    $('#notificationMessage').text(message);
                    notification.addClass('show');
                    setTimeout(() => {
                        notification.removeClass('show');
                    }, 4000);
                }

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
                    var expires = "";
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        expires = "; expires=" + date.toUTCString();
                    }
                    document.cookie = name + "=" + (value || "") + expires + "; path=/";
                }

                // Function to get a cookie
                function getCookie(name) {
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(';');
                    for(var i=0;i < ca.length;i++) {
                        var c = ca[i];
                        while (c.charAt(0)==' ') c = c.substring(1,c.length);
                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                    }
                    return null;
                }
            });
        </script>
    </body>
    </html>
  `);
});

app.post('/submit', (req, res) => {
  const { name, education, telephone, email } = req.body;

  const sql = 'INSERT INTO tutors (name, education, telephone, email) VALUES (?, ?, ?, ?)';
  connection.query(sql, [name, education, telephone, email], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.json({ type: 'error', message: 'Please check your internet connection!' });
    } else {
      res.json({ type: 'success', message: 'Thank you for sharing the information with us and we will contact you within 72 hours!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
