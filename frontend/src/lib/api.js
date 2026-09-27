import axios from "axios";

// This is the ONLY file in the frontend that talks to our backend.
// Every component/hook that needs a recipe goes through fetchRecipe() below
// instead of calling axios/fetch directly - that keeps the request URL,
// headers, and timeout config in exactly one place. The Groq API key never
// appears here (or anywhere in the frontend) - it lives only in the backend's
// .env file, which is the whole point of routing through our own server.
//
// Falls back to localhost:3000 for local dev; override with a .env file
// (VITE_API_BASE_URL=...) when deploying so the frontend can point at a
// hosted backend instead.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function fetchRecipe(ingredients, signal) {
  const response = await axios.post(
    `${API_BASE_URL}/api/recipe`,
    { ingredients },
    { signal, timeout: 20000 },
  );
  return response.data;
}
