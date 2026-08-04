import { getGuestRecipes, saveGuestRecipe, updateGuestRecipe, deleteGuestRecipe, clearGuestRecipes } from "./guestStorage";

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function getRecipes({ isGuest = false } = {}) {
  if (isGuest) {
    return getGuestRecipes();
  }

  try {
    return await requestJson("/api/favorite-actions");
  } catch (error) {
    console.warn("Unable to load authenticated recipes", error);
    throw error;
  }
}

export async function saveRecipe(recipe, { isGuest = false } = {}) {
  if (isGuest) {
    return saveGuestRecipe(recipe);
  }

  try {
    return await requestJson("/api/favorite-actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
  } catch (error) {
    console.warn("Unable to save authenticated recipe", error);
    throw error;
  }
}

export async function updateRecipe(recipe, { isGuest = false } = {}) {
  if (isGuest) {
    return updateGuestRecipe(recipe);
  }

  return recipe;
}

export async function deleteRecipe(recipeId, { isGuest = false } = {}) {
  if (isGuest) {
    return deleteGuestRecipe(recipeId);
  }

  try {
    return await requestJson("/api/favorite-actions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId }),
    });
  } catch (error) {
    console.warn("Unable to delete authenticated recipe", error);
    throw error;
  }
}

export async function clearRecipes({ isGuest = false } = {}) {
  if (isGuest) {
    return clearGuestRecipes();
  }

  return [];
}
