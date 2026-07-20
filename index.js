const express=  require('express');
const {doSomeHeavyTask}= require('./util');

const app = express();
const PORT= process.env.PORT || 8000;

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


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
