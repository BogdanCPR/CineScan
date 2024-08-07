import express from 'express';
import userRoute from './user.route.js';
import mediaRoute from './media.route.js';
import personRoute from './person.route.js';
import reviewRoute from './review.route.js';
import adminRoute from './admin.route.js';
import contactRoute from './contact.route.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/person', personRoute);
router.use('/reviews', reviewRoute);
router.use('/admin', adminRoute);
router.use('/contact', contactRoute);
router.use('/:mediaType', mediaRoute);


export default router;