document.addEventListener('mouseup', () => {
  const selection = window.getSelection()
  const selectedText = selection?.toString().trim()
  console.log('selectedText', selectedText)
})