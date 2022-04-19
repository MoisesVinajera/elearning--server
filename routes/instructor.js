import express from 'express';

const router = express.Router();

// middleware
import { requireSignin } from '../middlewares/index';

//controllers
import {
  makeInstructor,
  getAccountStatus,
  currentInstructor,
  getInstructorCourses,
  getStudentCount,
  getInstructorBalance,
  getInstructorPayoutSettings,
} from '../controllers/instructor';

router.post('/make-instructor', requireSignin, makeInstructor);
router.post('/get-account-status', requireSignin, getAccountStatus);
router.get('/current-instructor', requireSignin, currentInstructor);
router.get('/instructor-courses', requireSignin, getInstructorCourses);

router.get(
  '/instructor/student-count/:courseId',
  requireSignin,
  getStudentCount
);

router.get('/instructor/balance', requireSignin, getInstructorBalance);
router.get(
  '/instructor/payout-settings',
  requireSignin,
  getInstructorPayoutSettings
);
module.exports = router;
