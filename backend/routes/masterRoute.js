import { Router } from "express";
const router = Router();
import { allRoles } from "../controllers/masters/roleController.js";
import {
  addCategory,
  allCategories,
  deleteCategory,
  editCategory,
  getParentCategories,
} from "../controllers/masters/categoryController.js";
import { validateAddCategory } from "../middlewares/masters/categoryMiddleware.js";
import { addBrand, getBrands } from "../controllers/masters/brandController.js";

router.get(`/roles`, allRoles);

// ------
router
  .route(`/categories`)
  .get(allCategories)
  .post(validateAddCategory, addCategory);

router
  .route(`/categories/:id`)
  .put(validateAddCategory, editCategory)
  .delete(deleteCategory);

router.get(`/categories/parents`, getParentCategories);

// ------
router.post(`/brands/add`,addBrand);
router.get(`/brands/all`,getBrands);

export default router;
