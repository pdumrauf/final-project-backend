let instance = null;
class ProductService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        const data = await this.repository.getAll();
        return data;
    }

    async getByCategory(category) {
        const prods = await this.repository.getByCategory(category);
        return prods;
    }

    async createProduct(data) {
        return await this.repository.createProduct(data);
    }
    async getOne(id) {
        const prod = await this.repository.getOne(id);
        return prod;
    }

    async updateProduct(id, newProd) {
        return await this.repository.updateProduct(id, newProd);
    }

    async deleteProduct(id) {
        return await this.repository.deleteProduct(id);
    }

    static getInstance() {
        if (!instance) instance = new ProductService();
        return instance;
    }
}

module.exports = ProductService;