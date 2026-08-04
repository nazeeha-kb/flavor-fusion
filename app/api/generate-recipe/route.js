function extractJsonCandidate(text) {
  if (!text || !text.trim()) {
    return { ok: false, error: "Gemini returned an empty response." };
  }

  let normalized = text.trim();
  normalized = normalized.replace(/```(?:json)?/gi, "").trim();
  normalized = normalized.replace(/^json\s*/i, "").trim();

  if (!normalized) {
    return { ok: false, error: "Gemini returned an empty response." };
  }

  const candidateStart = Math.min(
    normalized.indexOf("["),
    normalized.indexOf("{")
  );

  if (candidateStart === -1) {
    return { ok: false, error: "Gemini response did not contain JSON data." };
  }

  const opening = normalized[candidateStart];
  const closing = opening === "[" ? "]" : "}";
  let depth = 0;
  let inString = false;
  let escapeNext = false;
  let endIndex = -1;

  for (let index = candidateStart; index < normalized.length; index += 1) {
    const char = normalized[index];

    if (inString) {
      if (escapeNext) {
        escapeNext = false;
      } else if (char === "\\") {
        escapeNext = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === opening) {
      depth += 1;
    } else if (char === closing) {
      depth -= 1;
      if (depth === 0) {
        endIndex = index;
        break;
      }
    }
  }

  if (endIndex === -1) {
    return {
      ok: false,
      error: "Gemini response was truncated before a complete JSON block was closed.",
    };
  }

  let candidate = normalized.slice(candidateStart, endIndex + 1).trim();
  candidate = candidate.replace(/,\s*([}\]])/g, "$1");

  return { ok: true, value: candidate };
}

function parseRecipeResponse(text) {
  if (!text || !text.trim()) {
    return { recipe: [], error: "Gemini returned an empty response." };
  }

  const extracted = extractJsonCandidate(text);
  if (!extracted.ok) {
    return { recipe: [], error: extracted.error };
  }

  try {
    const parsed = JSON.parse(extracted.value);
    if (!Array.isArray(parsed)) {
      return { recipe: [], error: "Gemini response did not contain a JSON array." };
    }

    return { recipe: parsed };
  } catch (error) {
    return {
      recipe: [],
      error: `Invalid JSON returned by Gemini: ${error.message}`,
    };
  }
}

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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4000,
          },
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", data);

    const finishReason = data?.candidates?.[0]?.finishReason;
    if (finishReason === "MAX_TOKENS") {
      console.error("Gemini response was truncated because the model hit MAX_TOKENS.");
      return new Response(
        JSON.stringify({
          recipe: [],
          message:
            "Gemini response was truncated. Please try again with shorter ingredients or a slightly simpler request.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const recipeText =
      data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") ?? "";

    console.log("Gemini extracted text:", recipeText);

    const parseCandidate = extractJsonCandidate(recipeText);
    console.log("Gemini parse input:", parseCandidate.ok ? parseCandidate.value : recipeText);

    const parsed = parseRecipeResponse(recipeText);

    return new Response(JSON.stringify({ recipe: parsed.recipe, message: parsed.error }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🛑 Gemini Error:", error);

    return new Response(
      JSON.stringify({ message: "Gemini error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
