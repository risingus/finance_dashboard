import { Table } from 'antd';
import { CardCurrency } from '../../components/CardCurrency';
import { ModalCreateCurrency } from '../../components/ModalCreateCurrency';
import { useExchanges } from '../../context/exchangeProvider';


const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];



export function Home() {
  const { exchanges } = useExchanges();


  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <CardCurrency from='USD' to={record.id} />
          ),

        }}
        dataSource={exchanges}
      />
      {
        exchanges.map((exchange) => (
          <CardCurrency from='USD' to={exchange.id} />
        ))
      }
      <ModalCreateCurrency />
    </div>
  )
}