import { Router } from 'express';
import { getUsers, createUser,getStudentTeam,getUserById ,getTeamsFrUsers} from '../controller/userControllers/userController';
import { getAdmin} from '../controller/adminController/AdminController';
import { getAdvisor, geAllTeams } from '../controller/advisorControllers/advisorController';
import { getTeam, geAllUsers } from '../controller/teamConmtroller/teamController';


const router = Router();

router.get('/users', getUsers);
router.get('/admin',getAdmin),
router.get('/advisor',getAdvisor),
router.get('/team',getTeam),
router.post('/users', createUser);
router.get('/users/team/:id', getStudentTeam);
router.get('/team/users/:id', geAllUsers);
router.get('/advisor/team/:id', geAllTeams)
router.get('/users/:id/team',getTeamsFrUsers)
router.get('/users/:name', getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;
