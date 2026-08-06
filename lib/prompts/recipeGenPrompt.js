export function buildRecipePrompt(ingredients) {
    return `
Generate 3 distinct and simple, classic recipes using the following ingredients as the primary base: ${ingredients.join(
        ", "
    )}. You may freely add complementary ingredients to make each recipe realistic and flavorful.

Indian cuisine influence is the priority, but you can create globally inspired or fusion dishes.

Each recipe must include:
- id (uuid v4)
- title
- expectedTime
- classification
- ingredients (array of strings in the format "ingredient - measure")
- instructions (array of strings)

Requirements:
- Return exactly 3 recipes.
- Never return an empty array.
- Do not include markdown, code fences, headings, notes, or explanations.
- Return only valid JSON. The response must be a single JSON array with no surrounding text.

Example schema:
[
  {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "title": "Recipe 1 Title",
    "expectedTime": "30 minutes",
    "classification": "Lunch",
    "ingredients": ["ingredient1 - 1 cup", "ingredient2 - 2 tbsp"],
    "instructions": ["Step 1", "Step 2"]
  }
]
`;
}