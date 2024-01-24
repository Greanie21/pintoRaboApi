"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetCockTailDbController_1 = require("./Controllers/GetCockTailDbController");
const GetCockTailByIngredients_1 = require("./Functions/GetCockTailByIngredients");
const express = require("express");
// const axios = require("axios"); // Import the axios library
const app = express();
const port = 3000;
let obj = [];
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        if (obj.length === 0) {
            obj = yield (0, GetCockTailDbController_1.getCockTailDbController)();
        }
    });
}
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield start();
    // console.log(obj.length, obj[0], "cocktails");
    const b = (0, GetCockTailByIngredients_1.getDrinksWhereIHaveAllIngredients)(obj, [
        "Dark rum",
        "Peach nectar",
        "Orange juice",
    ]);
    console.log(b.length, b[0], "getCocktailByIngredientsName");
    res.send("Drinks Loaded:" + obj.length);
    res.send("Routes = \n/GetDrinksByIngredient/AllIngredients \nAnd \n/GetDrinksByIngredient/SomeIngredients");
}));
app.get("/GetDrinksByIngredient/AllIngredients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield start();
    const { ingredients } = req.query;
    const cocktails = (0, GetCockTailByIngredients_1.getDrinksWhereIHaveAllIngredients)(obj, ingredients);
    console.log("Ingredients:", ingredients, cocktails);
    res.send(cocktails);
}));
app.get("/GetDrinksByIngredient/SomeIngredients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield start();
    const { ingredients } = req.query;
    const cocktails = (0, GetCockTailByIngredients_1.getDrinksWhereIHaveAtLeastOneIngredient)(obj, ingredients);
    console.log("Ingredients:", ingredients, cocktails);
    res.send(cocktails);
}));