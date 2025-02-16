document.addEventListener('mouseup', () => {
  const selection = window.getSelection()
  const selectedText = selection?.toString().trim()

  if (selectedText) {
    const range = selection?.getRangeAt(0)
    const rect = range?.getBoundingClientRect()
    const popover = document.createElement('div')

    console.log('range', range)
    console.log('rect', rect)
    popover.className = 'definition-popover'
    popover.style.left = `${rect?.left}px`
    popover.style.top = `${rect?.top}px`
    popover.style.backgroundColor = 'purple !important'
    popover.innerHTML = selectedText
    document.body.appendChild(popover)
  }
})
