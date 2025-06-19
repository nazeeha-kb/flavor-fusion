export async function POST(req) {
  const body = await req.json();
  console.log("🧾 Request body:", body);
  const { ingredients } = body;

  if (!ingredients || !ingredients.length) {
    return new Response(
      JSON.stringify({ message: "Ingredients are required" }),
      { status: 400 }
    );
  }

  try {
    const prompt = `
Generate 3 distinct and simple, classic recipes using the following ingredients as the primary base: ${ingredients.join(
      ", "
    )}You may freely add complementary ingredients to make each recipe realistic and flavorful.

    Indian cuisine influence is the priority — however, you can create globally inspired or fusion dishes.

Each recipe should include:
- a unique ID (uuid v4) for the recipe
- title
- expected time
- dish classification (breakfast, lunch, dinner, dessert, other)
- ingredients list (as an array) in the format (ingredinet - measure)
- step-by-step instructions (as an array)

Important:
- If the exact ingredients don’t form a full dish, you must still generate 3 recipes by adding appropriate supporting ingredients. 
- It is OK to omit or creatively adapt any ingredient if it doesn't fit well.
- Never return an empty array under any circumstances.

Return the response as a JSON array of recipe objects like this:

[
  {
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "title": "Recipe 1 Title",
    "expectedTime": "30 minutes",
    "classification": "Lunch",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": ["Step 1", "Step 2"]
  },
  {...}, {...}
]
.
Respond only with JSON array as described
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    console.log("🌟 OpenRouter Response:", data);

    // 1. This is getting the raw text

    //recipeText is raw string from AI
    const recipeText = data.choices?.[0]?.message?.content ?? "No content";

    let recipe = [];

    try {
      // 2. Parsing the text to JSON array
      recipe = JSON.parse(recipeText);
      console.log(`parsed recipe: ${recipe}`);
    } catch (err) {
      console.error(`Failed to parse recipe: ${err}`);
      recipe = []; //fallback to empty array on error
    }

    // 3. Returning the parsed recipe to the frontend
    return new Response(JSON.stringify({ recipe }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🛑 OpenRouter Error:", error);

    return new Response(
      JSON.stringify({ message: "OpenRouter error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
