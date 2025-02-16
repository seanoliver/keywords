import { mountDefinitionPopover } from "./DefinitionPopover"

console.log('Content script loaded');

document.addEventListener('mouseup', (event) => {
  console.log('Mouse up event triggered', event);
  
  const selection = window.getSelection()
  const selectedText = selection?.toString().trim()

  console.log('Selected text:', selectedText);

  if (selectedText) {
    const range = selection?.getRangeAt(0)
    const rect = range?.getBoundingClientRect()

    console.log('Selection rect:', rect);

    if (rect) {
      const position = {
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY + 5,
      };

      console.log('Mounting with position:', position);
      mountDefinitionPopover(selectedText, position)
    }
  }
})
