import {
    Router, Request, Response
} from "express";
import { v4 as uuidv4 } from 'uuid'

const productsRouter = Router()

interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_price: number
}
const products: Product[] = [
    {
        id: 1, product_name: 'phone', product_description: 'communication', product_price: 30
    },
    {
        id: 2, product_name: 'kayboard', product_description: 'typing', product_price: 5
    }
]

//get products
productsRouter.get('/', (req, res) => {
    res.status(200).json(products)
})

//add products
productsRouter.post('/', (req: Request<{}, {}, Omit<Product, 'id'>>, res) => {
    const newProduct: Product = {
        id: products.length+1,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price

    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

//fetch
productsRouter.get('/:id', (req, res)=>{
    const {id} = req.params
    const product = products.find(product => product.id === Number(id))
    if(!product){
        res.status(404).send(`Not found ! `)
        return
    }
    console.log(product)
    res.status(200).send(`Found the  product !!!`)
})

//Update
productsRouter.put('/:id', (req, res)=>{
    const {id} = req.params
    const foundIndex = products.findIndex( product => product.id === Number(id))
    if(foundIndex === -1){
        res.status(404).send(`Not found!`)
        return
    }
    const updateProduct: Product = {
        ...products[foundIndex],
        product_name: req.body.product_name ?? products[foundIndex].product_name,
        product_price: req.body.product_price ?? products[foundIndex].product_price
    }
    products[foundIndex] = updateProduct
    res.status(200).json(updateProduct)
})

//delete
productsRouter.delete('/:id', (req, res)=>{
    const {id} = req.params
    const foundIndex = products.findIndex(product => product.id === Number(id))
    if(foundIndex === -1){
        res.status(404).send(`Nor found!`)
        return
    }
    products.splice(foundIndex,1)
    res.status(200).send(`Product was deleted !`)
})

export default productsRouter