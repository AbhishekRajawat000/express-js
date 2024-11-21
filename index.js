import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

let teaData = []
let nextId = 1;

//add a new tea
app.post('/teas', (req, res)=>{
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})

//rout to get all tea
app.get('/teas', (req, res)=>{
    res.status(200).send(teaData);
})

// get a tea with id 
app.get('/teas/:id', (req, res)=>{
    const tea = teaData.findIndex(t => t.id === req.params.id);
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
})

// update a tea with id
app.put('/teas/:id', (req, res)=>{
    const tea = teaData.findIndex(t => t.id === req.params.id);
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea)
})
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// delete a tea with id

app.delete('/teas/:id', (req, res)=>{
    const index = teaData.findIndex(t => t.id === req.params.id);
    if (index === -1){
        return res.status(404).send('Tea not found')
    }
    teaData.splice(index, 1)
    return res.status(200).send('Deleted');
})
        

app.listen(port,()=>{
    console.log(`server is listening at port:${port}`);
})
    


