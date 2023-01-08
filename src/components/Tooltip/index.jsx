import * as TooltipRadix from '@radix-ui/react-tooltip';
import './style.css'

function Tooltip (props){

  return(
    <TooltipRadix.Provider delayDuration={100}>
      <TooltipRadix.Root>
        <TooltipRadix.Trigger asChild>
          {props.children}
        </TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          {(!props.disabled && props.content != "") && (
            <TooltipRadix.Content
              className="TooltipContent"
              sideOffset={4}
            >
              <span className="text-gray-800 text-xs">{props.content}</span>
              <TooltipRadix.Arrow className="TooltipArrow" />
            </TooltipRadix.Content>
          )}
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  )
};

export default Tooltip;