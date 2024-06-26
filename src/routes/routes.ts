import { Router } from 'express';
import { getUsers, createUser,getStudentTeam,getUserByName} from '../controller/userControllers/userController';
import { getAdmin} from '../controller/adminController/AdminController';
import { getAdvisor } from '../controller/advisorControllers/advisorController';
import { getTeam } from '../controller/teamConmtroller/teamController';


const router = Router();

router.get('/users', getUsers);
router.get('/admin',getAdmin),
router.get('/advisor',getAdvisor),
router.get('/team',getTeam),
router.post('/users', createUser);
router.get('/users/team', getStudentTeam);
router.get('/users/:name', getUserByName);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;
