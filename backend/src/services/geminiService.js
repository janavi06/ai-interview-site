import axios from "axios";

/*
 Generate Interview Questions
*/
export const generateInterviewQuestions =
  async ({
    role,
    experienceLevel,
    difficulty,
    numberOfQuestions,
  }) => {

    try {

      const prompt = `
You are a senior software engineer conducting a professional mock interview.

Generate ${numberOfQuestions} realistic interview questions for:

Role: ${role}
Experience Level: ${experienceLevel}
Difficulty: ${difficulty}

Requirements:
- Questions should feel like real company interviews.
- Include conceptual questions.
- Include debugging questions.
- Include scenario-based questions.
- Include practical real-world questions.
- Include behavioral questions if relevant.
- Questions must be role-specific.
- Avoid generic beginner questions.

Return ONLY valid JSON.

Format:

[
  {
    "questionId": 1,
    "question": "",
    "type": "",
    "topic": "",
    "difficulty": ""
  }
]
`;

      console.log(
        "Calling Gemini REST API..."
      );

      const response =
        await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              "Content-Type":
                "application/json",
            },
            timeout: 20000,
          }
        );

      const text =
        response.data
          ?.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text;

      if (!text) {
        throw new Error(
          "No response from Gemini"
        );
      }

      console.log(
        "Gemini Response:",
        text
      );

      // Remove markdown wrappers
      const cleaned =
        text.replace(
          /```json|```/g,
          ""
        );

      return JSON.parse(
        cleaned
      );

    } catch (error) {

      console.error(
        "FULL GEMINI ERROR:"
      );

      console.dir(
        error.response?.data
        || error.message,
        { depth: null }
      );

      throw new Error(
        "AI service temporarily unavailable. Please try again."
      );
    }
  };