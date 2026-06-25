import express from "express";
import { prisma} from "./lib/prisma.ts"
import cors from "cors"

const app = express()
const PORT = 3001
app.use(cors());
app.use(express.json());


app.get("/produtos", async (req, res) =>{
    try{
        const itens = await prisma.estoque.findMany()
        res.json(itens)

    } catch(error){
        res.status(500).json({error: "Erro ao buscar produtos"})
    }
});

app.post("/produtos", async (req, res) =>{
    const {nome, categoria, quantidade} = req.body;
    try{
        const novoItem = await prisma.estoque.create({
            data: {nome, categoria, quantidade: Number(quantidade)}
        });

        res.status(201).json(novoItem)
    } catch(error){
        res.status(400).json({error: "Erro ao criar produto"})
    }
})


app.put("/produtos/:id", async (req, res) =>{
    const {id} = req.params;
    const {nome, categoria, quantidade} = req.body;
    try{
        const atualizado = await prisma.estoque.update({
            where: {id: Number(id)},
            data: {nome, categoria, quantidade: Number(quantidade)}
        });
        res.json(atualizado)
    } catch(error){
        res.status(404).json({error: "Produto não encontrado"})
    }
})


app.delete("/produto/:id", async (req, res) =>{
    const {id} = req.params;
    try{
        await prisma.estoque.delete({
            where: {id: Number(id)}
        })
        res.status(204).send()
    } catch(error){
        res.status(404).json({error: "Produto nao encontrado"})
    }
})

app.listen(PORT, () =>{
    console.log(`👽666:Api chupa-cabra rodando em: http://localhost:${PORT}`)
})