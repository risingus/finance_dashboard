import { Button, Table } from 'antd';
import {DeleteFilled} from '@ant-design/icons'
import { LineChart } from '../../components/LineChart';
import { ModalCreateCurrency } from '../../components/ModalCreateCurrency';
import { useExchanges } from '../../context/exchangeProvider';
import { TableCellValue } from '../../components/TableCellValue';


const columns = ({ remove }: any) => [
  {
    title: 'Currency',
    dataIndex: 'id',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Value',
    dataIndex: '',
    render: (_: any, record: any) => <TableCellValue to={typeof record?.id === 'string' ? record.id : ''} key={`${record.id}-${record.description}`} />
  },
  {
    title: 'Action',
    dataIndex: '',
    render: (_: any, record: any) => <Button onClick={() => remove(record)}><DeleteFilled /></Button>
  },
];


export function Home() {
  const { exchanges, deleteExchange } = useExchanges();

  const remove = (exchange: any) => {
    deleteExchange(exchange)
  }

  return (
    <div>
      <Table
        columns={columns({ remove })}
        pagination={false}
        rowKey={(obj) => obj.id}
        expandable={{
          expandedRowRender: (record) => (
            <LineChart from='USD' to={record.id} key={record.id} />
          ),

        }}
        dataSource={exchanges}
      />
      <ModalCreateCurrency />
    </div>
  )
}