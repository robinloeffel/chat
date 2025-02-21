import { effect, signal } from "alien-signals";
import ollama, { type Message } from "ollama/browser";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const chatbotForm = document.querySelector<HTMLFormElement>("form")!;
const chatbotQuestion = document.querySelector<HTMLInputElement>("#question")!;
const chatHistoryList = document.querySelector<HTMLUListElement>("ul")!;
const chatStream = document.querySelector<HTMLLIElement>(".stream")!;
/* eslint-enable @typescript-eslint/no-non-null-assertion */

const messageStream = signal<string>("");
const chatHistory = signal<Message[]>([]);

effect(() => {
  const newMessage = chatHistory()
    .at(chatHistoryList.childElementCount - 1);

  if (newMessage) {
    const li = document.createElement("li");
    li.classList.add(newMessage.role);
    li.textContent = newMessage.content;
    chatStream.before(li);

    chatHistoryList.parentElement?.scroll({
      top: chatHistoryList.parentElement.scrollHeight,
      behavior: "smooth"
    });
  }
});

effect(() => {
  chatStream.textContent = messageStream();

  chatHistoryList.parentElement?.scroll({
    top: chatHistoryList.parentElement.scrollHeight,
    behavior: "smooth"
  });
});

const askAi = async (content: string) => {
  chatHistory([
    ...chatHistory(),
    {
      role: "user",
      content
    }
  ]);

  const response = await ollama.chat({
    model: "phi4:latest",
    messages: [
      {
        role: "system",
        content: "you are a helpful assistant. you answer concisely. keep it short and casual, bro! answer in german."
      },
      ...chatHistory()
    ],
    stream: true
  });

  for await (const chunk of response) {
    messageStream(messageStream() + chunk.message.content);
  }

  chatHistory([
    ...chatHistory(),
    {
      role: "assistant",
      content: messageStream()
    }
  ]);

  messageStream("");
};

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  void askAi(chatbotQuestion.value);
  chatbotQuestion.value = "";
});
