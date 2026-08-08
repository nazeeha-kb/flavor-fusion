import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/app/lib/dbConnect";
import GenerationActivity from "@/app/lib/models/GenerationActivity";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildWeeklyActivity(activityEntries) {
  const totals = new Map(
    weekdayLabels.map((day) => [day, { day, recipes: 0 }])
  );

  activityEntries.forEach((entry) => {
    if (!entry?.generatedAt) return;

    const generatedDate = new Date(entry.generatedAt);
    const dayLabel = weekdayLabels[generatedDate.getDay()];
    const entryCount = Number(entry.recipeCount) || 0;

    const currentTotal = totals.get(dayLabel) || { day: dayLabel, recipes: 0 };
    currentTotal.recipes += entryCount;
    totals.set(dayLabel, currentTotal);
  });

  return weekdayLabels.map((day) => totals.get(day));
}

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const activities = await GenerationActivity.find({
      userId: session.user.id,
    })
      .sort({ generatedAt: 1 })
      .lean();

    const chartData = buildWeeklyActivity(activities);

    return new Response(JSON.stringify(chartData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch generation activity:", error);

    return new Response(
      JSON.stringify({ error: "Unable to load generation activity." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
