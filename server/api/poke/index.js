import {AsyncRouter} from 'express-async-router';
import * as controller from './poke.controller';
import objectId from 'express-param-objectid';
import paginate from 'express-paginate';

const router = new AsyncRouter();

router.param('id', objectId);

router.use(paginate.middleware(10, 50));

router.get('/', controller.index);
router.get('/group', controller.GroupByUserFights);
router.get('/suggestedPokes', controller.suggestedPokes);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
