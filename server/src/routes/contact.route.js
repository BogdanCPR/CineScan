import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/save", contactController.saveForm);

router.get("/get", contactController.getContacts);

router.delete("/remove/:id", contactController.removeContact)

export default router;