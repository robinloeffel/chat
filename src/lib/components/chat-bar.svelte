<script lang="ts">
  import ollama, { type Message } from "ollama";

  interface Props {
    history?: Message[];
    thinkStart?: (prompt: string) => void;
    thinkChunk?: (chunk: string) => void;
    thinkEnd?: (message: string) => void;
  }

  const {
    history = [],
    thinkChunk,
    thinkStart,
    thinkEnd
  }: Props = $props();

  let searchTerm = $state("");

  const promptAi = async (prompt: string) => await ollama.chat({
    model: "phi4:latest",
    messages: [
      {
        role: "system",
        content: "you are a helpful assistant. you answer concisely. keep it short and casual, bro!"
      },
      ...history,
      {
        role: "user",
        content: prompt
      }
    ],
    stream: true
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const content = searchTerm;
    let message = "";
    searchTerm = "";

    thinkStart?.(content);

    for await (const chunk of await promptAi(content)) {
      message += chunk.message.content;
      thinkChunk?.(chunk.message.content);
    }

    thinkEnd?.(message);
  };
</script>

<section class="chat-bar">
  <form class="chat-form" onsubmit={handleSubmit}>
    <input
      name="search"
      autocomplete="off"
      placeholder="Warum ist der Himmel blau?"
      type="search"
      bind:value={searchTerm}
    />
  </form>
</section>

<style lang="scss">
  @use "$styles/variables";

  .chat-bar {
    --pico-spacing: 0;
    --pico-block-spacing-vertical: 0;

    position: fixed;
    inset: auto 0 0;
    border-top: variables.$space-2 solid var(--pico-background-color);
    backdrop-filter: blur(variables.$space-8);
  }

  .chat-form {
    width: min(100% - variables.$space-64, variables.$content-width);
    margin: variables.$space-32 auto;
  }
</style>
