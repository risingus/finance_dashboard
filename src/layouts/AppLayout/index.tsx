import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}