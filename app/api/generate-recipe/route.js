// Prompt
import { buildRecipePrompt } from "@/lib/prompts/recipeGenPrompt";
// Models
import User from "@/app/lib/models/User";
import GenerationActivity from "@/app/lib/models/GenerationActivity";
// next auth
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
// db connect
import dbConnect from "@/app/lib/dbConnect";

function extractJsonCandidate(text) {
  if (!text || !text.trim()) {
    return { ok: false, error: "Gemini returned an empty response." };
  }

  let normalized = text.trim();
  // removes markdown code fences
  normalized = normalized.replace(/```(?:json)?/gi, "").trim();
  // removes stray leading json
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
  await dbConnect()

  const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/"
  const GEMINI_MODEL = "gemini-3.5-flash";

  const body = await req.json();
  const { ingredients } = body;

  if (!ingredients || !ingredients.length) {
    return new Response(
      JSON.stringify({ message: "Ingredients are required" }),
      { status: 400 }
    );
  }

  try {
    const prompt = buildRecipePrompt(ingredients);

    const response = await fetch(
      `${GEMINI_URL}${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

    const parsed = parseRecipeResponse(recipeText);

    // Save generation activity
    if (parsed.recipe.length > 0) {
      await saveGenerationActivity(parsed.recipe);
    }

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

async function saveGenerationActivity(recipes) {

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return; // Guest or not signed in
  }

  const userId = session.user.id;


  await GenerationActivity.create({
    userId,
    recipeCount: recipes.length,
  });

  await User.findByIdAndUpdate(userId, {
    lastGeneratedAt: new Date(),
  });

}