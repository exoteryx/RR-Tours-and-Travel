import 'dotenv/config'
import express from "express"
import Run from './Source/Modules/Run.js'

const App = express()
const PORT = 3000;

Run(App,express);

App.listen(PORT,()=>{
    console.log(`App Listening on Port ${PORT}!`);
})