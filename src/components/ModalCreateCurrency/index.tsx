/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { Select } from 'antd';
// import styles from './styles.module.scss'
// import { Cross1Icon } from '@radix-ui/react-icons'
import { useCurrencies } from '../../hooks/useCurrencies';
// import { Button, ButtonRound } from '../Buttons';
// import { Select } from '../Inputs/Select';

const { Option } = Select;

export const ModalCreateCurrency = () => {
  const currencies = useCurrencies();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  // const [list, setList] = useState([])

  function addExchangeRate() {
    const selectedCurrency = currencies.find((currency) => currency.id === selected)
    console.log(selectedCurrency, 'here dude')
    setOpen(false)
  }


  return (
    <>
      <Button type='primary' onClick={(() => setOpen((state) => !state))}>
        Add
      </Button>

      <Modal
        title='Add Currency'
        centered
        open={open}
        onOk={addExchangeRate}
        onCancel={() => setOpen(false)}
        okText='add'
      >
        add currency

        <Select
          showSearch
          placeholder='To'
          optionFilterProp='children'
          onChange={(value) => setSelected(value)}
          value={selected}
        >
          {
            currencies.map((currency) => (
              <Option key={currency.id} value={currency.id}>{currency.description}</Option>
            ))
          }
        </Select>
      </Modal>
    </>
  );

}
