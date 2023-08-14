import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './styles.module.scss'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useCurrencies } from '../../hooks/useCurrencies';



export const ModalCreateCurrency = () => {
  const currencies = useCurrencies();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <button>Edit profile</button>
    </Dialog.Trigger>
    <Dialog.Portal>
        <Dialog.Overlay className={styles.backdrop} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.header}>
            Add currency exchange
            <Dialog.Close asChild>
              <button aria-label="Close">
                <Cross1Icon />
              </button>
            </Dialog.Close>
          </Dialog.Title>
        <Dialog.Description className="DialogDescription">
            Choose currencies to show exchange
        </Dialog.Description>
        <fieldset className="Fieldset">
            <label>
              From
              <select name="selectFrom">
                {
                  Array.isArray(currencies)
                  && currencies.length > 0
                  && currencies.map((currency) => {
                    if (!currency) return null;
                    if (!currency?.id) return null
                    if (!currency?.description) return null

                    return <option value={currency.id}>{currency.id} - {currency.description}</option>
                  })
                }
              </select>
            </label>
        </fieldset>
        <fieldset className="Fieldset">
            <label>
              To
              <select name="selectTo">
                {
                  Array.isArray(currencies)
                  && currencies.length > 0
                  && currencies.map((currency) => {
                    if (!currency) return null;
                    if (!currency?.id) return null
                    if (!currency?.description) return null

                    return <option value={currency.id}>{currency.id} - {currency.description}</option>
                  })
                }
              </select>
            </label>
        </fieldset>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
              <button>Save changes</button>
          </Dialog.Close>
        </div>

      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

}
