// script.js

// Función para registrar un usuario
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;

    if (password !== confirmPassword) {
        displayMessage('Las contraseñas no coinciden', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
        displayMessage('El correo ya está registrado', 'error');
        return;
    }

    const newUser = { email, password, name, role, tasks: [] }; // Añadir propiedad `tasks` para guardar tareas del usuario
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    displayMessage('Usuario registrado con éxito', 'success');
    setTimeout(() => window.location.href = 'index.html', 1500);
}

// Función para iniciar sesión
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Guardar el usuario en sesión
        localStorage.setItem('currentUser', JSON.stringify(user));

        displayMessage('¡Inicio de sesión exitoso!', 'success');
        setTimeout(() => window.location.href = 'tasks.html', 1500);
    } else {
        displayMessage('Usuario o contraseña incorrectos', 'error');
    }
}

// Función para mostrar mensajes
function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'success' ? 'green' : 'red';
}

// Cargar datos del usuario actual
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Actualizar usuario actual en localStorage (por ejemplo, al modificar tareas)
function updateCurrentUser(user) {
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = users.map(u => u.email === user.email ? user : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(user));
}
