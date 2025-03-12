// index.js

// Import required modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile } from "fs/promises";
import dotenv from "dotenv";

// Load environment variables from .env file (if present)
dotenv.config();

// Ensure the GOOGLE_AI_KEY is set
if (!process.env.GOOGLE_AI_KEY) {
  console.error("Error: Missing GOOGLE_AI_KEY in environment variables.");
  process.exit(1);
}

// Load configuration from the JSON file
const loadConfig = async () => {
  try {
    const data = await readFile("config.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading config.json:", error);
    throw error;
  }
};

(async () => {
  // Load the configuration
  const config = await loadConfig();

  // Initialize the GoogleGenerativeAI client
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

  // Set up the AI model using the configuration from config.json
  const aiModel = genAI.getGenerativeModel({
    model: config.aiModel.model,
    generationConfig: config.aiModel.generationConfig,
    systemInstruction: config.aiModel.systemInstruction
  });

  // Set up the LOVE model using the configuration from config.json
  const loveModel = genAI.getGenerativeModel({
    model: config.loveModel.model,
    systemInstruction: config.loveModel.systemInstruction
  });

  /**
   * generateResult - Generates a response from the specified AI model.
   *
   * @param {string} prompt - The prompt to send to the AI.
   * @param {string} [type="ai"] - The type of model to use ("ai" or "love").
   * @returns {Promise<string>} - The generated response as plain text.
   */
  const generateResult = async (prompt, type = "ai") => {
    const modelToUse = type === "love" ? loveModel : aiModel;
    try {
      const result = await modelToUse.generateContent(prompt);
      // Return the plain text response from the result
      return result.response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  };

  // ---------------------
  // Sample Usage
  // ---------------------
  try {
    // Example using the technical AI model
    const techPrompt = "Create an express application";
    const aiResponse = await generateResult(techPrompt, "ai");
    console.log("AI Model Response:\n", aiResponse);

    // Example using the LOVE model for a warm, empathetic response
    const lovePrompt = "I feel a little down today.";
    const loveResponse = await generateResult(lovePrompt, "love");
    console.log("LOVE Model Response:\n", loveResponse);
  } catch (err) {
    console.error("An error occurred during generation:", err);
  }
})();
