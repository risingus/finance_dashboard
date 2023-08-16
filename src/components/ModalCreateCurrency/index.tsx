import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './styles.module.scss'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useCurrencies } from '../../hooks/useCurrencies';
import { Button, ButtonRound } from '../Buttons';
import { Select } from '../Inputs/Select';



export const ModalCreateCurrency = () => {
  const currencies = useCurrencies();
  const [open, setOpen] = useState(false);

  function addExchangeRate() {
    console.log('here dude')
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.backdrop} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.header}>
            Add currency exchange
            <Dialog.Close asChild>
              <ButtonRound aria-label="Close">
                <Cross1Icon />
              </ButtonRound>
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description>
            Choose currencies to show exchange
          </Dialog.Description>
          <Select options={currencies ?? []} double label='From' />
          <Select options={currencies ?? []} double label='To' />
          <div className={styles.footer}>
            <Dialog.Close asChild aria-label="Cancel">
              <Button secondary>Cancel</Button>
            </Dialog.Close>
            <Button onClick={addExchangeRate}>Confirm</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
);

}
