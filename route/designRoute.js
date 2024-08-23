import express, { Router } from 'express';
import { getDesignById , getAllDesigns , createDesign , deleteDesignById , getDesignByUserId} from '../controller/designController.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.get('/', getAllDesigns);
router.get('/:designId',getDesignById);
router.delete('/:designId',deleteDesignById);
router.get('/user/:userId' , getDesignByUserId);
router.post('/', createDesign);

export default router;