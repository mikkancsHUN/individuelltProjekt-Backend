import nedb from 'nedb-promises';

const database = new nedb({ filename: 'coffees.db', autoload: true });

async function addCoffee(coffee) {
    try {
        const newCoffee = { ...coffee, createdAt: new Date() };
        const result = await database.insert(newCoffee);
        return result;
    } catch (error) {
        console.error('Error inserting coffee:', error);
        throw new Error('Error inserting coffee');
    }
}

async function updateCoffee(id, updatedCoffee) {
    try {
        const result = await database.update({ _id: id }, { $set: { ...updatedCoffee, modifiedAt: new Date() } }, {});
        return result;
    } catch (error) {
        console.error('Error updating coffee:', error);
        throw new Error('Error updating coffee');
    }
}

async function deleteCoffee(id) {
    try {
        const result = await database.remove({ _id: id }, {});
        return result;
    } catch (error) {
        console.error('Error deleting coffee:', error);
        throw new Error('Error deleting coffee');
    }
}

export { addCoffee, updateCoffee, deleteCoffee };
