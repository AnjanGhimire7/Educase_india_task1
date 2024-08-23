import { Router } from "express";
import  {addSchool,listSchools} from "../controllers/school.controller.js"
const router=Router()
router.route("/addschool").post(addSchool)
router.route("/listschool").get(listSchools)
export default router