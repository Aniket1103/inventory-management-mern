import express from "express";
import { isAuthenticated, isManager } from "../middleware/auth.js";
import {
  approveInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  getUnapprovedInventoryItems,
} from "../controllers/inventoryItem.js";
import { createInventoryItem } from "../controllers/inventoryItem.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, getInventoryItems)                      //fetch all approved items
  .post(isAuthenticated, isManager, createInventoryItem)         //create a new inventory item
  
router
  .route("/unapproved")
  .get(isAuthenticated, isManager, getUnapprovedInventoryItems)      //fetch all unapproved items

router
  .route("/approve/:id")
  .patch(isAuthenticated, isManager, approveInventoryItem);       //approve an inventory item
  
router
  .route("/:id")
  .get(isAuthenticated, isManager, getInventoryItems)            //get Item by Id
  .delete(isAuthenticated, isManager, deleteInventoryItem);      //delete an inventory item



export default router;
