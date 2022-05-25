const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

const { check } = require("express-validator");

let checkValid = [
  check("title")
    .notEmpty()
    .withMessage(
      "Debes ingresar el título de la película en su idioma original"
    ),
  check("rating")
    .notEmpty()
    .withMessage("Ingresar la clasificación")
    .bail()
    .isNumeric()
    .withMessage("Ingresar en el rango de 0.0 a 10.0"),
  check("awards")
    .notEmpty()
    .withMessage("Ingresar la cantidad de premios recibidos")
    .bail()
    .isNumeric()
    .withMessage("Ingresar un valor numérico"),
  check("release_date").notEmpty().withMessage("Ingresar una fecha válida"),
  check("length")
    .notEmpty()
    .withMessage("Ingresar la duración en minutos")
    .bail()
    .isNumeric()
    .withMessage("Ingresar la cantidad de minutos de duración"),
  check("genre_id")
    .notEmpty()
    .withMessage("Seleccionar un género del menú desplegable"),
];

//Se retira /movies de las rutas al definir correctamente el Router en app.js//

router.get("/", moviesController.list);
router.get("/new", moviesController.new);
router.get("/recommended", moviesController.recomended);
router.get("/detail/:id", moviesController.detail);

router.get("/add", moviesController.add);
router.post("/create", checkValid, moviesController.create);

router.get("/edit/:id", moviesController.edit);
router.put("/update/:id", checkValid, moviesController.update);

router.get("/delete/:id", moviesController.delete);
router.delete("/delete/:id", moviesController.erase);

module.exports = router;
