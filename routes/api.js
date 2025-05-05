import * as taskController from '../app/controller/taskController.js'
import * as usersController from '../app/controller/usersController.js'
import * as noteController from '../app/controller/noteContorller.js'
import * as entertainmentController from '../app/controller/entertainmentController.js'
import * as healthController from '../app/controller/healthController.js'
import * as educationController from '../app/controller/educationController.js'
import * as financeController from '../app/controller/financeController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';




import express from "express"


const router = express.Router()

//task api
router.post ("/createTask",AuthMiddleware,taskController.CreateTask)
router.get("/showTask",AuthMiddleware, taskController.ShowTask)
router.post("/deleteTask",AuthMiddleware,taskController.DeleteTask)



//user auth api
router.post("/Registration", usersController.Registration)
router.post("/Login", usersController.Login)
router.post("/CodeVerify", usersController.CodeVerify)
router.post("/EmailVerify", usersController.EmailVerify)
router.get("/ProfileDetails",AuthMiddleware, usersController.ProfileDetails)
router.post("/ResetPassword", usersController.ResetPassword)



//note api
router.post ("/createNote",AuthMiddleware,noteController.CreateNote)
router.get("/showNote",AuthMiddleware,noteController.ShowNote )
router.post("/deleteNote",AuthMiddleware,noteController.DeleteNote)


//entertainmentController
router.post ("/addMovie",AuthMiddleware, entertainmentController.AddMovie)
router.get ("/viewMovieByNo_watch",AuthMiddleware,entertainmentController.viewMovieByNo_watch)
router.post ("/deleteMovie", AuthMiddleware,entertainmentController.deleteMovie)
router.get ("/viewMovieByWatch",AuthMiddleware,entertainmentController.viewMovieByWatch)
router.post ("/updateStatus", AuthMiddleware,entertainmentController.updateStatus)



//health api
router.get("/viewArticles", healthController.viewArticles)
router.get("/viewArticle", healthController.viewArticle)
router.get("/BMI", healthController.BMI)


//education api
router.get("/viewPDF",AuthMiddleware, educationController.viewPDF)
router.get("/downloadPDF",AuthMiddleware, educationController.downloadPDF)
router.post("/addPDF", AuthMiddleware, educationController.addPDF);


//finance api
router.post('/addBalance',AuthMiddleware, financeController.addBalance);
router.post('/addExpenditure',AuthMiddleware, financeController.addExpenditure);
router.get('/balance', AuthMiddleware,financeController.getBalance);
router.get('/expenditures',AuthMiddleware, financeController.getExpenditures);


export default  router
