const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const {responseFormat} = require('../../config/OpenAI/responseFormat');
const {systemText} = require('../../config/OpenAI/systemMessages/base');
const {userMessage} = require('../../config/OpenAI/userMessages/base');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const generateRecipe = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
            "text": systemText,
            "type": "text"
          }
        ]
        },
        {
          role: "user",
          content: [
            {
            "text": userMessage,
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

    // Extract the message content from the response
    const messageContent = response.choices[0].message;

    res.status(200).json(messageContent);
  } catch (error) {
    console.error("Error generating recipe:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

module.exports = {generateRecipe};