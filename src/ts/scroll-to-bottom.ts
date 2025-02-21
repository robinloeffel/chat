import { ticked } from "./ticked";

export const scrollToBottom = (element: HTMLElement) => {
  ticked(() => {
    element.parentElement?.scroll({
      top: element.parentElement.scrollHeight,
      behavior: "smooth"
    });
  });
};
