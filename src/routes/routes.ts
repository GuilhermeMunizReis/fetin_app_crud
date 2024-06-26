import { Router } from 'express';
import { getUsers, createUser } from '../controller/userControllers/userController';
import { getAdmin} from '../controller/adminController/AdminController';
import { getAdvisor } from '../controller/advisorControllers/advisorController';
import { getTeam } from '../controller/teamConmtroller/teamController';


const router = Router();

router.get('/users', getUsers);
router.get('/admin',getAdmin),
router.get('/advisor',getAdvisor),
router.get('/team',getTeam),
router.post('/users', createUser);
// router.get('/:id', getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;
