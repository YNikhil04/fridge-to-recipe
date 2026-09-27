import { useCallback, useRef, useState } from "react";
import { fetchRecipe } from "../lib/api";
import { isValidRecipe } from "../lib/validateResult";

export function useRecipeGenerator() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [recipe, setRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [generationId, setGenerationId] = useState(0);

  const lastInputRef = useRef("");
  const requestIdRef = useRef(0);
  const abortRef = useRef(null);

  const generate = useCallback(async (ingredientsText) => {
    const trimmed = (ingredientsText || "").trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Please enter at least one ingredient.");
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const thisRequestId = ++requestIdRef.current;

    lastInputRef.current = trimmed;
    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await fetchRecipe(trimmed, controller.signal);

      if (thisRequestId !== requestIdRef.current) return;

      if (!isValidRecipe(data)) {
        setStatus("error");
        setErrorMessage(
          "The AI returned something we couldn't understand. Please try again.",
        );
        return;
      }

      setRecipe(data);
      setGenerationId((id) => id + 1);
      setStatus("success");
    } catch (err) {
      if (thisRequestId !== requestIdRef.current) return;
      if (err.code === "ERR_CANCELED") return;

      const serverMessage = err.response?.data?.error;
      setStatus("error");
      setErrorMessage(
        serverMessage ||
          (err.code === "ECONNABORTED"
            ? "The request took too long. Please try again."
            : "Couldn't reach the server. Check your connection and try again."),
      );
    }
  }, []);

  const retry = useCallback(() => {
    if (lastInputRef.current) generate(lastInputRef.current);
  }, [generate]);

  const reset = useCallback(() => {
    setStatus("idle");
    setRecipe(null);
    setErrorMessage("");
  }, []);

  return { status, recipe, errorMessage, generate, retry, reset, generationId };
}
