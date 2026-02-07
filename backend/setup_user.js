const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const password = '123';
const email = 'riteshkumar90359@gail.com';

async function createUser() {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now(),
            email: email,
            password: hashedPassword,
            phone: '+91 6206269895',
            name: 'Ritesh'
        };

        let users = [];
        const usersFile = path.join(__dirname, 'users.json');

        if (fs.existsSync(usersFile)) {
            users = JSON.parse(fs.readFileSync(usersFile));
        }

        // Check if user already exists
        if (!users.find(u => u.email === email)) {
            users.push(newUser);
            fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
            console.log('User created successfully');
        } else {
            console.log('User already exists');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

createUser();
