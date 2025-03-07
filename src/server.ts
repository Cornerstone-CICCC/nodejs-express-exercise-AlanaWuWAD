import express, {Router, Request, Response} from 'express'
import dotenv from 'dotenv'
import productsRouter from './routes/products.route'
dotenv.config()


const app = express()

app.use(express.json())

//Routes
app.get('/',(req, res)=>{
    res.status(200).send(` Home page `)
})

app.use('/products', productsRouter)

//Fallback
app.use((req, res)=>{
    res.status(404).send(`Can't find!`)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`server is ${PORT}`)
})
