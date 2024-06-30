import nedb from 'nedb-promises';

const database = new nedb({ filename: 'users.db', autoload: true });

// Add new user
async function addUser(user) {
    try {
        const newUser = await database.insert(user);
        return newUser;
    } catch(err) {
        throw new Error("Error registering user!");
    }
}

// GET all users
async function getAllUsers() {
    const users = await database.find({});
    return users;
}

// Login user
async function authenticateUser(username, password = null) {
    try {
        const query = { username };
        if (password) query.password = password;

        const user = await database.findOne(query);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        return user;
    } catch(err) {
        throw new Error("Invalid credentials");
    }
}

export { addUser, getAllUsers, authenticateUser };
