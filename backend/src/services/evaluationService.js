import axios from "axios";

// Evaluate interview answer

export const evaluateAnswer =
async ({
    question,
    userAnswer,
    role,
    difficulty,
}) => {

    try {

        const prompt = `
You are a senior software engineer conducting a technical interview.

Evaluate this interview answer professionally.

Role: ${role}
Difficulty: ${difficulty}

Question:
${question}

Candidate Answer:
${userAnswer}

Evaluation Rules:

1. Give score from 0 to 10.
2. Mention strengths.
3. Mention weaknesses.
4. Mention missing concepts.
5. Provide ideal professional answer.

Return ONLY valid JSON.

Format:
{
  "score": 8,
  "strengths": [
    ""
  ],
  "weaknesses": [
    ""
  ],
  "missingConcepts": [
    ""
  ],
  "idealAnswer": ""
}
`;

        console.log(
            "Calling Gemini Evaluation API..."
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
            }
        );

        /*
         FIX:
         Extract Gemini text
        */
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
            "Evaluation Response:",
            text
        );

        /*
         Remove markdown formatting
        */
        const cleaned =
        text.replace(
            /```json|```/g,
            ""
        ).trim();

        try {
            return JSON.parse(
                cleaned
            );
        } catch {
            console.error(
                "Invalid Gemini JSON:"
            );

            console.log(
                cleaned
            );

            throw new error (
                "Gemini returned invalid JSON"
            );

        }



    } catch (error) {

        console.error(
            "Evaluation Error:"
        );

        console.dir(
            error.response
            ?.data
            ||
            error.message,
            {
                depth: null,
            }
        );

        throw new Error(
            "AI evaluation failed"
        );
    }
};