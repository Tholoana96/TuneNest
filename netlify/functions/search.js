import fetch from "node-fetch";

export async function handler(event) {
  const q = event.queryStringParameters?.q;
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query" }),
    };
  }

  try {
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`
    );
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
