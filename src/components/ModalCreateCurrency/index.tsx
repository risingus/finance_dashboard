import { useState } from 'react';
import { Button, Modal } from 'antd';
import { Select } from 'antd';
import { useCurrencies } from '../../hooks/useCurrencies';
import { useExchanges } from '../../context/exchangeProvider';
import styles from './styles.module.scss'

const { Option } = Select;

export const ModalCreateCurrency = () => {
  const currencies = useCurrencies();
  const { addExchange } = useExchanges();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function addExchangeRate() {
    const selectedCurrency = currencies.find((currency) => currency.id === selected)
    if (!selectedCurrency) return;
    addExchange(selectedCurrency)
    setOpen(false)
  }

  return (
    <>
      <Button type='primary' onClick={(() => setOpen((state) => !state))}>
        Add Currency
      </Button>

      <Modal
        title='Add Currency'
        centered
        open={open}
        onOk={addExchangeRate}
        onCancel={() => setOpen(false)}
        okText='add'
      >
        <div className={styles.modal_content}>
        <Select
          showSearch
          placeholder='Select Currency'
          optionFilterProp='children'
          onChange={(value) => setSelected(value)}
          value={selected}
          style={{width: '100%'}}
        >
          {
            currencies.map((currency) => (
              <Option key={currency.id} value={currency.id}>{currency.description}</Option>
            ))
          }
        </Select>
        </div>
      </Modal>
    </>
  );

}
