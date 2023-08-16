import styles from './styles.module.scss'

interface option {
  id?: string
  description?: string
}

interface SelectProps {
  options?: option[]
  label?: string
  double?: boolean
}

export const Select = ({ options = [], label = '', double = false }: SelectProps) => {
  return (
    <div className={styles.selectContainer}>
      <label htmlFor={`select-${label}`}>{label}</label>
      <select name={`select-${label}`}>
        {
          Array.isArray(options)
          && options.length > 0
          && options.map((option) => {
            if (!option) return null;
            if (!option?.id) return null;
            if (!option?.description) return null;

            return (
              <option value={option.id} key={option.id}>
                {
                  double
                    ? `${option.id} - ${option.description}`
                    : option.description
                }
              </option>
            )
          })
        }
      </select>
    </div>
  )
}