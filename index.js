const express=  require('express');
const client=require('prom-client'); //for metric collection
const {doSomeHeavyTask}= require('./util');

const app = express();
const PORT= process.env.PORT || 8000;



const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({register: client.register});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/slow', async (req, res) => {
  try{
    const timeTaken=await doSomeHeavyTask();
    return res.json({
        status:'success',
        message:`Task completed in ${timeTaken} ms`
    });

  }
  catch(err){
    return res.status(500).json({
        status:'error',
        message:err.message
    });
  }
}
);

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics= await client.register.metrics();
    res.send(metrics);

})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
