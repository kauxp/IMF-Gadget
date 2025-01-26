import {
  getGadget,
  createGadget,
  updateGadget,
  deleteGadget,
  selfDestructGadget,
} from "../controllers/gadget.controller.js";

import express from "express";
const router = express.Router();


router.get("", getGadget);
router.post("", createGadget);
router.put("/:id", updateGadget);
router.delete("/:id", deleteGadget);
router.post("/:id/self-destruct", selfDestructGadget);

export default router;
