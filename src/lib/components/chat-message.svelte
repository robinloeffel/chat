<script lang="ts">
  import DOMPurify from "dompurify";
  import { marked } from "marked";
  import type { Message } from "ollama";

  interface Props {
    message: Message;
  }

  const { message }: Props = $props();

  const text = $derived(
    DOMPurify.sanitize(
      marked(message.content, { async: false })
    )
  );
</script>

<article
  class="message"
  class:assistant={message.role === "assistant"}
  class:user={message.role === "user"}
>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html text}
</article>

<style lang="scss">
  @use "$styles/variables";

  .message {
    --pico-border-radius: #{variables.$space-12};
    --pico-typography-spacing-vertical: 0;

    width: fit-content;
    max-width: 90%;

    &.assistant {
      margin-right: auto;
    }

    &.user {
      margin-left: auto;
    }
  }
</style>
