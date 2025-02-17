console.log('Content script loaded')

const highlightSelection = () => {
  const selection = window.getSelection()
  if (!selection) return
  console.log('selection', selection)

  const range = selection.getRangeAt(0)
  console.log('range', range)
  normalizeRangeBoundaries(range)
  console.log('normalized range', range)
  wrapTextNodes(range)
}

const isTextNode = (node: Node): node is Text => {
  return node.nodeType === Node.TEXT_NODE
}

const normalizeRangeBoundaries = (range: Range) => {
  const startContainer = range.startContainer
  const startOffset = range.startOffset

  // If the user started selection in the middle of a text node, split it
  if (isTextNode(startContainer) && startOffset > 0) {
    startContainer.splitText(startOffset)
    range.setStartAfter(startContainer)
  }

  const endContainer = range.endContainer
  const endOffset = range.endOffset

  // If the user ended selection in the middle of a text node, split it
  if (
    isTextNode(endContainer) &&
    endOffset > 0 &&
    endContainer.textContent &&
    endOffset < endContainer.textContent.length
  ) {
    endContainer.splitText(endOffset)
    range.setEndBefore(endContainer)
  }
}

const wrapTextNodes = (range: Range) => {
  const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  let currentNode = walker.currentNode

  while (currentNode) {
    if (range.intersectsNode(currentNode)) {
      console.log('intersectsNode', currentNode)
      const highlightSpan = document.createElement('span')
      highlightSpan.style.backgroundColor = 'yellow'
      highlightSpan.setAttribute('title', 'Highlighted text')

      // Insert the span before the text node
      currentNode.parentNode?.insertBefore(highlightSpan, currentNode)

      // Move the text node inside the span
      highlightSpan.appendChild(currentNode)
    }

    const nextNode = walker.nextNode()

    if (nextNode) {
      currentNode = nextNode
    } else {
      break
    }
  }
}

document.addEventListener('mouseup', () => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    highlightSelection()
  }
})