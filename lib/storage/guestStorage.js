const GUEST_RECIPES_KEY = "flavor-fusion:guest-recipes";

function safeParse(value) {
  if (!value) return [];

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("Malformed guest recipe data", error);
    return [];
  }
}

function notify(message) {
  if (typeof window !== "undefined" && window.dispatchEvent) {
    window.dispatchEvent(new CustomEvent("flavor-fusion:storage-message", { detail: message }));
  }
}

function getStoredRecipes() {
  if (typeof window === "undefined") return [];

  try {
    return safeParse(window.localStorage.getItem(GUEST_RECIPES_KEY));
  } catch (error) {
    console.warn("Unable to read guest recipes", error);
    notify("Your guest recipes could not be loaded right now.");
    return [];
  }
}

function setStoredRecipes(recipes) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(GUEST_RECIPES_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.warn("Unable to save guest recipes", error);
    notify("Guest recipes could not be saved because storage is full or unavailable.");
  }
}

export function getGuestRecipes() {
  return getStoredRecipes();
}

export function saveGuestRecipe(recipe) {
  const recipes = getStoredRecipes();
  const nextRecipes = [recipe, ...recipes.filter((item) => item.id !== recipe.id)];
  setStoredRecipes(nextRecipes);
  return nextRecipes;
}

export function updateGuestRecipe(recipe) {
  const recipes = getStoredRecipes();
  const nextRecipes = recipes.map((item) => (item.id === recipe.id ? recipe : item));
  setStoredRecipes(nextRecipes);
  return nextRecipes;
}

export function deleteGuestRecipe(recipeId) {
  const recipes = getStoredRecipes();
  const nextRecipes = recipes.filter((item) => item.id !== recipeId);
  setStoredRecipes(nextRecipes);
  return nextRecipes;
}

export function clearGuestRecipes() {
  if (typeof window === "undefined") return [];

  try {
    window.localStorage.removeItem(GUEST_RECIPES_KEY);
    return [];
  } catch (error) {
    console.warn("Unable to clear guest recipes", error);
    notify("Guest recipes could not be cleared right now.");
    return getStoredRecipes();
  }
}
