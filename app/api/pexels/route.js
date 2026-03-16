// app/api/pexels/route.js
import { createClient } from "pexels";

const client = createClient(process.env.PEXELS_API_KEY);

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");

        const res = await client.photos.search({ query, per_page: 5 });
        const photo = res.photos?.[0];

        return new Response(JSON.stringify({ url: photo?.src.medium || "/utensils-canva.png" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Pexels fetch error", err);
        return new Response(JSON.stringify({ url: "/utensils-canva.png" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}