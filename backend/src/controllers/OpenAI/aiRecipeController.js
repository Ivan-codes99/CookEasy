const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const {responseFormat} = require('../../config/OpenAI/responseFormat');
const {systemMessage} = require('../../config/OpenAI/systemMessages/base');
const {userMessage} = require('../../config/OpenAI/userMessages/base');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const generateRecipe = async (req, res) => {
  try {
    const userMessageContent = userMessage();
    const systemMessageContent = systemMessage();
    console.log(`User message:\n ${userMessageContent}`);
    console.log(`System message:\n ${systemMessageContent}`);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
            "text": systemMessageContent,
            "type": "text"
          }
        ]
        },
        {
          role: "user",
          content: [
            {
            "text": userMessageContent,
            "type": "text"
          }
        ]
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: responseFormat
      },
      temperature: 0.35,
      max_completion_tokens: 10000,
      top_p: 0,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    console.log("OpenAI response:", response); // Log the entire response

    // Extract the message content from the response
    const messageContent = response.choices[0].message;

    res.status(200).json(messageContent);
  } catch (error) {
    console.error("Error generating recipe:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateRecipe };