export interface AIService {
  generateText(prompt: string): Promise<string>;
}

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const aiServiceInstance: AIService = {
  async generateText(prompt: string): Promise<string> {
    try {
      const message = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1024'),
      });

      const content = message.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      return content;
    } catch (error: any) {
      console.error('OpenAI error:', error);
      throw new Error('Failed to generate text via OpenAI');
    }
  },
};

export const aiService = aiServiceInstance;


