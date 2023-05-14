import { faker } from '@faker-js/faker';

faker.locale = 'es';

export const mockProducts = () => {
    let products = [];
    const generateProduct = () => {
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl(),
            code: faker.random.alphaNumeric(4),
            stock:faker.random.numeric(2),
            _id: faker.database.mongodbObjectId() 
        }
    }
    for(let i=0; i<100; i++){
        products.push(generateProduct());
    }
    const productsToString = JSON.stringify(products);
    return productsToString;
}