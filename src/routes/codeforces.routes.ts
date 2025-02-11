import { Router } from 'express';
import { CodeforcesController } from '../controller/codeforces.controller';

const router = Router();
const codeforcesController = new CodeforcesController();

router.get('/user/:username', codeforcesController.getUserData);

export default router;