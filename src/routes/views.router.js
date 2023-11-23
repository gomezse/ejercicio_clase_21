import { Router } from "express";
import { productsManager } from "../managers/ProductsManager.js";


const router = Router();

router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile");
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile");
    }
    res.render("signup");
});

router.get("/profile", async (req, res) => {
    if (!req.session.passport) {
        return res.redirect("/login");
    }

    //obtengo listado de productos.
    const products = await productsManager.findAll(req.query);

    if (!products.payload.length) {
        return res.status(200).json({ message: 'No products' });
    }

    const { payload } = products;
    const productsObject = payload.map(product => product.toObject());

    res.render("profile", { products: productsObject, user: req.user.toObject() });
});

router.get("/restaurar", (req, res) => {
    res.render("restaurar");
  });
  
  router.get("/error", (req, res) => {
    res.render("error");
  });

export default router;