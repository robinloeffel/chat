<script lang="ts">
  import { ChatBar, ChatHistory } from "$components";
  import type { Message } from "ollama";

  let thinking = $state(false);
  const fullHistory: Message[] = $state([]);
  const history = $derived(fullHistory.filter(message => message.content));

  const thinkChunk = (chunk: string) => {
    const currentMessage = fullHistory.at(-1);

    if (currentMessage) {
      currentMessage.content += chunk;
    }
  };

  const thinkStart = (prompt: string) => {
    thinking = true;

    fullHistory.push({
      role: "user",
      content: prompt
    }, {
      role: "assistant",
      content: ""
    });
  };

  const thinkEnd = () => {
    thinking = false;
  };
</script>

<main>
  <ChatHistory {history} {thinking} />
</main>

<footer>
  <ChatBar {history} {thinkChunk} {thinkEnd} {thinkStart} />
</footer>
