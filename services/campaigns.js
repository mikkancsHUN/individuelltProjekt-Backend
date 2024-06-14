import nedb from 'nedb-promises';
const database = new nedb({ filename : 'campaigns.db', autoload : true});

async function addCampaign(campaign) {
    const { products, price } = campaign;
    
    if (!products || !price) {
        throw new Error('All fields are required');
    }

    for (const productId of products) {
        const product = await database.findOne({ id: productId });
        if (!product) {
            throw new Error(`Product with id ${productId} does not exist`);
        }
    }

    const newCampaign = { ...campaign, createdAt: new Date() };

    try {
        const result = await database.insert(newCampaign);
        return result;
    } catch (err) {
        throw new Error('Error adding campaign');
    }
}

export { addCampaign };

