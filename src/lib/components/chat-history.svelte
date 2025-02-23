<script lang="ts">
  import { ChatMessage } from "$components";
  import icon from "iconoir/icons/regular/flower.svg?raw";
  import type { Message } from "ollama";

  interface Props {
    history: Message[];
    thinking?: boolean;
  }

  const { history, thinking }: Props = $props();
</script>

<ul class="chat-history">
  {#each history as message (message.content)}
    <li class="chat-item">
      <ChatMessage {message} />
    </li>
  {/each}

  {#if thinking}
    <li class="thinking">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html icon}
    </li>
  {/if}
</ul>

<style lang="scss">
  @use "$styles/variables";

  .chat-history {
    width: min(100% - variables.$space-64, variables.$content-width);
    margin: variables.$space-32 auto variables.$space-128;
  }

  .chat-item {
    margin-bottom: 0;
    list-style-type: none;
  }

  .thinking {
    --pico-typography-spacing-vertical: 0;

    display: inline-grid;
    animation: spin 1s alternate infinite;
    will-change: rotate;
  }

  @keyframes spin {
    to {
      rotate: 1turn;
    }
  }
</style>
