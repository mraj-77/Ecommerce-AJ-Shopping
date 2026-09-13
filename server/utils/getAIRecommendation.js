export async function getAIRecommendation(req, res, userPrompt, products) {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        throw new Error("GEMINI_API_KEY is missing");
    }

    // const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`;
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;
    try {
        const geminiPrompt = `
Here is a list of available products:

${JSON.stringify(products, null, 2)}

Based on the following user request:

"${userPrompt}"

Return ONLY the matching products as a valid JSON array.

Do not add markdown.
Do not add explanations.
Do not add code fences.

Example:
[
  {
    "id": "product-id",
    "name": "Product Name"
  }
]
`;   // uper kuchh apana man se likha hu

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: geminiPrompt,
                            },
                        ],
                    },
                ],
                generationConfig: {
                    responseMimeType: "application/json",  // ye extra hai
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);

            throw new Error(
                data?.error?.message || "Gemini API request failed"
            );
        }

        const aiResponseText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

        if (!aiResponseText) {
            throw new Error("AI response is empty");
        }

        const cleanedText = aiResponseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsedProducts;   // yaha bhi kuchh apana man se kiya hu

        try {
            parsedProducts = JSON.parse(cleanedText);
        } catch (error) {
            console.error("AI JSON Parse Error:", error);
            console.error("AI Response:", cleanedText);

            throw new Error("Failed to parse AI response");
        }

        return {
            success: true,
            products: parsedProducts,
        };
    } catch (error) {
        console.error("getAIRecommendation Error:", error);

        throw error;
    }
}