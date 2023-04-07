// src/chatgpt.ts
export async function chatGPT(prompt: string): Promise<string> {
  const response = await fetch("/api/chatgpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const chatGPTResponse = await response.json();
  return chatGPTResponse.choices[0].text;
}
