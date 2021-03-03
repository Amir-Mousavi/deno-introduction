import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  addBook,
} from "./controllers.js";

const router = new Router();

router
  .get("/books", getBooks)
  .get("/books/:isbn", getBook)
  .delete("/books/:isbn", deleteBook)
  .post("/books", addBook)
  .put("/books/:isbn", updateBook);

export default router;
