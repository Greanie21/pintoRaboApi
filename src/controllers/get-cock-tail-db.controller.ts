import { IDrink } from "../interfaces/drink.interface";

export async function getCockTailDbController(): Promise<IDrink[]> {
  const _obj: IDrink[] = [];
  const alphabetArray: string[] = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  for (const letter of alphabetArray) {
    // const a = await getCockTailDb(letter);
    const a = getCockTailFromFiles(letter);

    if (a.length > 0) {
      _obj.push(...a);
    }
  }

  return _obj;
}

function getCockTailFromFiles(letter: string) {
  // read the file and store it in a variable
  const data = require("../assets/cock-tail-db/" +
    letter.toUpperCase() +
    ".json");

  // extract the value of the key "drinks" and store it in a variable
  const drinks: IDrink[] = drinkFactory(data.drinks);
  return drinks;
}

function drinkFactory(drinkUnformatted: any): IDrink[] {
  if (drinkUnformatted === null || drinkUnformatted?.length === 0) {
    return [];
  }

  let formattedDrinks: IDrink[] = [];

  drinkUnformatted.forEach((element: any) => {
    let formattedDrink: IDrink = {
      idDrink: -1,
      strDrink: "",
      strDrinkAlternate: "",
      strTags: "",
      strVideo: "",
      strCategory: "",
      strIBA: "",
      strAlcoholic: "",
      strGlass: "",
      strInstructions: "",
      strInstructionsES: "",
      strInstructionsDE: "",
      strInstructionsFR: "",
      strInstructionsIT: "",
      strInstructionsZH_HANS: "",
      strInstructionsZH_HANT: "",
      strDrinkThumb: "",
      ingredients: [],
      strImageSource: "",
      strImageAttribution: "",
      strCreativeCommonsConfirmed: "",
      dateModified: "",
      ...element,
    };

    ingredientsFactory(element, formattedDrink);

    formattedDrink.strDrink = formattedDrink.strDrink?.toLowerCase();

    formattedDrinks.push(formattedDrink);
  });

  return formattedDrinks;
}

function ingredientsFactory(element: any, formattedDrink: IDrink) {
  let continueLoop = true;
  let index = 1;
  while (continueLoop) {
    let ingredient = "";
    let measure = "";

    if ("strIngredient" + index in element) {
      ingredient = element["strIngredient" + index];
    }
    if ("strMeasure" + index in element) {
      measure = element["strMeasure" + index];
    }

    if (
      (ingredient === "" || ingredient === null) &&
      (measure === "" || measure === null)
    ) {
      continueLoop = false;
      break;
    }

    formattedDrink.ingredients.push({
      id: null,
      name: ingredient?.toLowerCase(),
      measure: measure?.toLowerCase(),
    });

    index++;
  }
}
