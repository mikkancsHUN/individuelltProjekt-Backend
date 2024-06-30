import nedb from 'nedb-promises';

const coffeesDb = new nedb({ filename: 'coffees.db', autoload: true });

// Add new coffee
async function addCoffee(coffee) {
    try {
        const newCoffee = { ...coffee, createdAt: new Date() };
        const result = await coffeesDb.insert(newCoffee);
        return result;
    } catch (error) {
        console.error('Error inserting coffee:', error);
        throw new Error('Error inserting coffee');
    }
}

// GET all coffees
async function getAllCoffees() {
    try {
        const coffees = await coffeesDb.find({});
        return coffees;
    } catch(error) {
        console.error(error);
    }
}

// Update coffee
async function updateCoffee(id, updatedCoffee) {
    try {
        console.log('Updating coffee with id:', id);
        const result = await coffeesDb.update({ _id: id }, { $set: { ...updatedCoffee, modifiedAt: new Date() } }, {});
        if (result === 0) {
            console.log('Coffee not found for id:', id);
            throw new Error('Coffee not found');
        }
        console.log('Update result:', result);
        return result;
    } catch (error) {
        console.error('Error updating coffee:', error);
        throw new Error('Error updating coffee');
    }
}

// Delete coffee
async function deleteCoffee(id) {
    try {
        const result = await coffeesDb.remove({ _id: id });
        if (result === 0) {
            console.log('Coffee not found for id:', id);
            throw new Error('Coffee not found');
        }
        return result;
    } catch (error) {
        console.error('Error deleting coffee:', error);
        throw new Error('Error deleting coffee');
    }
}

export { addCoffee, getAllCoffees, updateCoffee, deleteCoffee, coffeesDb };
