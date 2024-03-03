import * as express from "express";
import { filterResponses } from "../responses/filterResponses";

export const router = express.Router();

router.get("/:formId/filteredResponses", filterResponses);
