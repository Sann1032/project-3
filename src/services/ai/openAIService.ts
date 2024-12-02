import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, make API calls through your backend
});

export const openAIService = {
  async getAssistantResponse(threadId: string | null, message: string) {
    try {
      // Create a thread if none exists
      const thread = threadId 
        ? await openai.beta.threads.retrieve(threadId)
        : await openai.beta.threads.create();

      // Add the user's message to the thread
      await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: message
      });

      // Run the assistant
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID
      });

      // Poll for the completion
      let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      while (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        
        if (runStatus.status === 'failed') {
          throw new Error('Assistant run failed');
        }
      }

      // Get the messages
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];

      return {
        threadId: thread.id,
        message: lastMessage.content[0].text.value
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
};