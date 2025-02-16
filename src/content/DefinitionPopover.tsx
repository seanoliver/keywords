import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useRef } from 'react'

export const DefinitionPopover = ({
  selectedText,
  position,
  onClose,
}: {
  selectedText: string
  position: { x: number; y: number }
  onClose?: () => void
}) => {
  return (
    <Popover open={true} onOpenChange={onClose}>
      <PopoverContent>{selectedText}</PopoverContent>
    </Popover>
  )
}
