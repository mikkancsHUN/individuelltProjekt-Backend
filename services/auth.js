import nedb from 'nedb-promises';

const usersDb = new nedb({ filename: 'users.db', autoload: true });

async function addUser(user) {
    try {
        const newUser = await usersDb.insert(user);
        return newUser;
    } catch(err) {
        throw new Error("Error registering user!");
    }
}

async function authenticateUser(username, password = null) {
    try {
        const query = { username };
        if (password) query.password = password;

        const user = await usersDb.findOne(query);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        return user;
    } catch(err) {
        throw new Error("Invalid credentials");
    }
}

export { addUser, authenticateUser };
