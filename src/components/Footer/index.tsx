import { Anchor } from 'antd';
import styles from './styles.module.scss'

const {Link} = Anchor;

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        Powered by
      </span>
        <Link  href='https://fxratesapi.com/' target='_blank' title='fxratesapi.com' />
    </footer>
  )
}