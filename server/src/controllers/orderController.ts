import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Product } from '../interfaces/productInterface';
import { Package } from '../interfaces/packageInterface';

const getProducts = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '../data/productdata.json'); 

    fs.readFile(filePath, 'utf-8', (err, data) => {
        //If error occurs before parsing
        if (err) {
            return res.status(500).json({ error: 'Failed to read the product data.' });
        }

        try {
            const products = JSON.parse(data);
            res.json(products);
        } catch (parseError) {
            console.error(parseError); 
            res.status(500).json({ error: 'Failed to parse the product data.' });
        }
    });
};


const placeOrder = (req: Request, res: Response) => {
    const selectedProducts: Product[] = req.body;
    const maxPricePerPackage = 250;  
    const packages: Package[] = [];
    
    let currentPackage: Product[] = [];
    let currentTotalPrice = 0;
    let currentTotalWeight = 0;

    //Courier Charges:given in the question
    const calculateCourierPrice = (weight: number) => {
        if (weight <= 200) return 5;
        if (weight <= 500) return 10;
        if (weight <= 1000) return 15;
        return 20; 
    };

    selectedProducts.forEach((product) => {
        if (currentTotalPrice + product.price > maxPricePerPackage) {
            // Push the current package to the packages array
            packages.push({ 
                items: currentPackage, 
                totalWeight: currentTotalWeight, 
                totalPrice: currentTotalPrice, 
                courierPrice: calculateCourierPrice(currentTotalWeight)  // Calculate courier price based on weight
            });

            currentPackage = [product];
            currentTotalPrice = product.price;
            currentTotalWeight = product.weight;
        } else {
            currentPackage.push(product);
            currentTotalPrice += product.price;
            currentTotalWeight += product.weight;
        }
    });

   //Adding to the packages array
    if (currentPackage.length > 0) {
        packages.push({
            items: currentPackage,
            totalWeight: currentTotalWeight,
            totalPrice: currentTotalPrice,
            courierPrice: calculateCourierPrice(currentTotalWeight)  
        });
    }


    res.json({
        message: 'Order placed successfully!',
        packages: packages
    });
};


export {getProducts, placeOrder}