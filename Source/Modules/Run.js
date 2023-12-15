import Connect from "../../Database/Connection.js"
import { GlobalErrorHandler } from "../Middleware/ErrorHandling.js"
import AuthRouter from '../Modules/Auth/Router.js'
const Run = async (App,express)=>{
    App.use(express.json())
    Connect()
    App.use("/auth",AuthRouter)
    App.get("/",(req,res)=>{
      res.json({Message:"Welcome"})
    }) //Keep Last
    App.get("*",(req,res)=>{
        res.json({Message:"404 Page Not Found"})
    }) //Keep Last
    App.use(GlobalErrorHandler); //Keep Last
}

export default Run