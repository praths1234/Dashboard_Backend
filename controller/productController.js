import Product from "../model/Product.js";
export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      if (products) {
        res.send(products);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const getProductByCategoryAndVariant = async (req, res) => {
    try {
      const { productCategory, productVariant } = req.body;
  
      if (!productCategory || !productVariant) {
        return res.status(400).json({ message: 'Category and variant are required' });
      }
  
      // Log the received query parameters for debugging
      console.log(`Received productCategory: ${productCategory}, productVariant: ${productVariant}`);
  
      const product = await Product.findOne({ productCategory, productVariant });
  
      // Check if the product was found and respond accordingly
      if (product) {
        res.send(product);
      } else {
        res.status(404).json({ message: `No products found for category: ${productCategory} and variant: ${productVariant}` });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            customizationOptions: {
                text: "Custom text",
                design: "Custom design",
            },
        };

        const product = new Product(productData);
        const result = await product.save();
        res.status(201).send(result);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

