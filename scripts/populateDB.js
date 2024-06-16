const mongoose = require('mongoose');
const Product = require('../models/product');
const connectDB = require('../config/db')



async function run(){
    try{

        await connectDB();

        const products = [
            { name: 'Laptop HP', description: 'Laptop HP con 16GB RAM y 512GB SSD', price: 1000, priority: 3 },
            { name: 'Smartphone Samsung', description: 'Samsung Galaxy S21 con 128GB de almacenamiento', price: 800, priority: 2 },
            { name: 'Audífonos Sony', description: 'Audífonos inalámbricos con cancelación de ruido', price: 200, priority: 4 },
            { name: 'Monitor Dell', description: 'Monitor Dell 24 pulgadas Full HD', price: 150, priority: 1 },
            { name: 'Teclado mecánico Logitech', description: 'Teclado mecánico RGB con switches Cherry MX', price: 120, priority: 5 }
        ];
        await Product.insertMany(products);

        console.log("All dataset inserted");
    }
    catch(error){
        console.error(error);
    } finally{
        mongoose.connection.close();
    }

    
}

run()

