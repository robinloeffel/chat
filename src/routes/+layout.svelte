<script lang="ts">
  import "$styles/index.scss";
  import icon from "iconoir/icons/regular/flower.svg";
  import type { LayoutProps } from "./$types";

  const { children }: LayoutProps = $props();
</script>

<svelte:head>
  <title>Robins Chatbot</title>
  <link href={icon} rel="icon" />
</svelte:head>

{@render children()}
