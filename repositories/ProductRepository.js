const ProductDTO = require("../dtos/ProductDTO");
const productDAOFactory = require("../factories/productDAOFactory");

let instance = null;

class ProductRepository {
    constructor() {
        this.dao = productDAOFactory(process.env.STORAGE);
    }

    async createProduct(product) {
        const prod = await this.dao.createItem(product);
        const productDTO = new ProductDTO(prod);
        return productDTO;
    }

    async getAll() {
        const prods = await this.dao.getItems();
        const productsDTO = prods.map((prod) => new ProductDTO(prod));
        return productsDTO;
    }

    async getByCategory(category) {
        const prods = await this.dao.getByCategory({ category });
        const prodsDTO = prods.map((prod) => new ProductDTO(prod));
        return prodsDTO;
    }

    async getOne(id) {
        const prod = await this.dao.getItemById(id);

        return prod ? new ProductDTO(prod) : undefined;
    }

    async updateProduct(id, newProd) {
        const prod = await this.dao.updateItem(id, newProd);
        console.log(prod);
        const prodDTO = new ProductDTO(prod);
        return prodDTO;
    }

    async deleteProduct(id) {
        return await this.dao.deleteItem(id);
    }

    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new ProductRepository();
        return instance;
    }
}

module.exports = ProductRepository;