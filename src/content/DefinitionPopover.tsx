import { useRef } from 'react'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

interface DefinitionPopoverProps {
  selectedText: string
  position: { x: number; y: number }
  onClose: () => void
}

export const DefinitionPopover: React.FC<DefinitionPopoverProps> = ({
  selectedText,
  position,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={popupRef}
      className="fixed bg-white rounded-lg shadow-lg p-4 z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        border: '2px solid red',
        minWidth: '200px',
        minHeight: '100px',
      }}
    >
      <div className="mb-2">Selected text: {selectedText}</div>
      <button
        onClick={() => {
          console.log('Button clicked:', selectedText)
          // Your action here
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Do Something
      </button>
    </div>
  )
}

export const mountDefinitionPopover = (
  selectedText: string,
  position: { x: number; y: number }
) => {
  console.log('Mounting popover:', { selectedText, position });

  // Remove existing popover
  const popover = document.getElementById('definition-popover-container')
  popover?.remove()

  // Create new popover
  const popoverContainer = document.createElement('div')
  popoverContainer.id = 'definition-popover-container'
  document.body.appendChild(popoverContainer)

  console.log('Container created:', popoverContainer);

  const root = createRoot(popoverContainer)

  const unmount = () => {
    console.log('Unmounting popover');
    root.unmount()
    popoverContainer.remove()
  }

  root.render(
    <DefinitionPopover selectedText={selectedText} position={position} onClose={unmount} />
  )

  return unmount
}
