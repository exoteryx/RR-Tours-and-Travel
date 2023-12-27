import Connect from "../../Database/Connection.js"
import { GlobalErrorHandler } from "../Middleware/ErrorHandling.js"
import AuthRouter from '../Modules/Auth/Router.js'
import TourRouter from '../Modules/Tour/Router.js'
import CityRouter from '../Modules/City/Router.js'
const Run = async (App,express)=>{
    App.use(express.json());
    Connect();
    App.use("/auth",AuthRouter);
    App.use('/tour',TourRouter);
    App.use("/city",CityRouter),
    App.get("/",(req,res)=>{
      res.json({Message:"Welcome"})
    }); //Keep Last
    App.get("*",(req,res)=>{
        res.status(404).json({Message:"404 Page Not Found"})
    }); //Keep Last
    App.use(GlobalErrorHandler); //Keep Last
}

export default Run