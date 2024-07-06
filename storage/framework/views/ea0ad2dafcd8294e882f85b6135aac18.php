<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <!-- Include Axios library -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <h1>Register</h1>
    <form id="registerForm">
        <input type="text" name="name" id="name" placeholder="Name" required>
        <input type="email" name="email" id="email" placeholder="Email" required>
        <input type="password" name="password" id="password" placeholder="Password" required>
        <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" required>
        <input type="text" name="profile_photo" id="profile_photo" placeholder="Profile Photo URL">
        <select name="gender" id="gender" required>
            <option value="" disabled selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <button type="submit">Register</button>
    </form>

    <script>
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                password_confirmation: document.getElementById('password_confirmation').value,
                profile_photo: document.getElementById('profile_photo').value,
                gender: document.getElementById('gender').value
            };

            axios.post('http://test-course.test/api/register', formData)
                .then(response => {
                    console.log('Response:', response.data);
                    alert('Registration successful!');
                })
                .catch(error => {
                    console.error('Error:', error.response ? error.response.data : error.message);
                    alert('Registration failed!');
                });
        });
    </script>
</body>
</html>
<?php /**PATH G:\largon\laragon\www\test-course\resources\views/register.blade.php ENDPATH**/ ?>