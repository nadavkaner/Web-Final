import {AsyncRouter} from 'express-async-router';
import * as controller from './user.controller';

const router = new AsyncRouter();

router.get('/', controller.index);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.post('/login', controller.login);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;