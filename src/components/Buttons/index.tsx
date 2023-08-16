import { ReactNode, useRef, PointerEvent, RefObject } from 'react'
import styles from './styles.module.scss'

interface ButtonProps {
  children: ReactNode
  secondary?: boolean
  onClick?: () => void
}

function focusButtonMove(event: PointerEvent<HTMLButtonElement>, ref: RefObject<HTMLButtonElement>) {
  if (!event?.currentTarget) return;
  if (!ref?.current) return
  if (event.currentTarget !== ref.current) return;

  const xPosition = Math.max((event.clientX - ref.current.getBoundingClientRect().left) / 16);

  const yPosition = Math.max((event.clientY - ref.current.getBoundingClientRect().top) / 16);

  event.currentTarget.style.setProperty('--xPosition', `${xPosition}rem`);
  event.currentTarget.style.setProperty('--yPosition', `${yPosition}rem`);
}

export const Button = ({ children, secondary = false, onClick, ...rest }: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <button {...rest} onClick={onClick} className={secondary ? styles['button-secondary'] : styles['button-primary']} ref={buttonRef} onPointerMove={(e) => focusButtonMove(e, buttonRef)}>
      {children}
      <div>
        {children}
      </div>
    </button>
  )
}


export const ButtonRound = ({ children, secondary = true, ...rest }: ButtonProps) => {
  const buttonRoundRef = useRef<HTMLButtonElement>(null)

  return (
    <button {...rest} className={secondary ? styles['button-secondary-round'] : styles['button-primary-round']} ref={buttonRoundRef} onPointerMove={(e) => focusButtonMove(e, buttonRoundRef)}>
      {children}
      <div>
        {children}
      </div>
    </button>
  )

}