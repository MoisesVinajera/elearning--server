import express from 'express';
import formidable from 'express-formidable';
const router = express.Router();

// middleware
import { requireSignin, isInstructor, isEnrolled } from '../middlewares/index';

//controllers
import {
  uploadImage,
  removeImage,
  createCourse,
  readCourse,
  uploadVideo,
  removeVideo,
  addLesson,
  updateCourse,
  removeLesson,
  updateLesson,
  publishCourse,
  unpublishCourse,
  getCourses,
  updatePreviewLesson,
  checkEnrollment,
  freeEnrollment,
  paidEnrollment,
  stripeSuccess,
  getUserCourses,
  markCompleted,
  listCompleted,
  markIncomplete,
} from '../controllers/course';

router.get('/courses', getCourses);
// image
router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);
// course
router.post('/course', requireSignin, isInstructor, createCourse);
router.put('/course/:slug', requireSignin, updateCourse);
router.get('/course/:slug', readCourse);
router.post(
  '/course/video-upload/:instructorId',
  requireSignin,
  formidable(),
  uploadVideo
);
router.post('/course/video-remove/:instructorId', requireSignin, removeVideo);

// publish unpublish
router.put('/course/publish/:courseId', requireSignin, publishCourse);
router.put('/course/unpublish/:courseId', requireSignin, unpublishCourse);

router.post('/course/lesson/:slug/:instructorId', requireSignin, addLesson);
router.put('/course/lesson/:slug/:instructorId', requireSignin, updateLesson);
router.put(
  '/course/lesson/video-preview/:slug/:instructorId/',
  requireSignin,
  updatePreviewLesson
);
router.put('/course/:slug/:lessonId', requireSignin, removeLesson);

// check enrollment
router.get('/check-enrollment/:courseId', requireSignin, checkEnrollment);

// enrollment
router.post('/free-enrollment/:courseId', requireSignin, freeEnrollment);
router.post('/paid-enrollment/:courseId', requireSignin, paidEnrollment);
router.get('/stripe-success/:courseId', requireSignin, stripeSuccess);

// courses user enrolled
router.get('/user-courses', requireSignin, getUserCourses);
router.get('/user/course/:slug', requireSignin, isEnrolled, readCourse);

// marl completed
router.post('/mark-completed', requireSignin, markCompleted);
router.post('/mark-incomplete', requireSignin, markIncomplete);
router.post('/list-completed', requireSignin, listCompleted);

module.exports = router;
