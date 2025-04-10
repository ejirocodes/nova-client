import { useChat } from "@ai-sdk/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const api = `${import.meta.env.VITE_API_URL}/tools/task-planner`;

export function Welcome() {
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({
      api,
      body: () => ({
        prompt: input,
      }),
    });

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      {messages
        .filter((message) => message.role === "assistant")
        .map((message) => (
          <AITextRenderer key={message.id} content={message.content} />
        ))}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={input}
          rows={10}
          cols={50}
          onChange={handleInputChange}
          className="border border-white p-3"
        />
        <button type="submit" className="bg-white text-black">
          Submit
        </button>
      </form>
    </main>
  );
}

export function AITextRenderer({ content }: { content: string }) {
  return (
    <Markdown
      children={content}
      remarkPlugins={[remarkGfm]}
      urlTransform={(url) => url}
    />
  );
}
