// lib/fetchImage.js
export async function fetchImageFromPixabay(query) {
  const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&category=food&per_page=3`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      return data.hits[0].webformatURL;
    } else {
      console.log("No image found on Pixabay for", query);
      return "/images/fallback.jpg";
    }
  } catch (error) {
    console.error("Error fetching from Pixabay:", error);
    return "/images/fallback.jpg";
  }
}
