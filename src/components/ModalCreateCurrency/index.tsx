/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { Select } from 'antd';
// import styles from './styles.module.scss'
// import { Cross1Icon } from '@radix-ui/react-icons'
import { useCurrencies } from '../../hooks/useCurrencies';
// import { Button, ButtonRound } from '../Buttons';
// import { Select } from '../Inputs/Select';

const filterSelectCurrency = (input: string, option?: { id: string, description: string }) => (option?.description || '').toLowerCase().includes(input.toLowerCase())

export const ModalCreateCurrency = () => {
  const currencies = useCurrencies();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  // const [list, setList] = useState([])

  // function addExchangeRate(option?: { id: string, description: string }) {
  //   console.log('here dude')
  //   setOpen(false)
  // }

  return (
    <>
      <Button type='primary' onClick={(() => setOpen((state) => !state))}>
        Add
      </Button>

      <Modal
        title='Add Currency'
        centered
        open={open}
        // onOk={() => addExchangeRate(false)}
        onCancel={() => setOpen(false)}
        okText='add'
      >
        add currency

        <Select
          showSearch
          placeholder='From'
          optionFilterProp='children'
          options={currencies}
          value={
            {
              description: "United States Dollar",
              id: "USD",
              label: "United States Dollar"
            }}
          filterOption={filterSelectCurrency}
          disabled
        />

        <Select
          showSearch
          placeholder='To'
          optionFilterProp='children'
          options={currencies}
          value={selected ?? null}
          filterOption={filterSelectCurrency}
          onChange={(value) => setSelected(value)}
        />



      </Modal>
    </>
  );

}
