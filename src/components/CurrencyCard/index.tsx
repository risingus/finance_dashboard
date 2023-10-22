import { Card, Statistic, Collapse } from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import { RateStatistic } from '../RateStatistic';
import { LineChart } from '../LineChart';
import { useExchanges } from '../../context/exchangeProvider';
import styles from './styles.module.scss'


const Label = ({ id = '', description = '' }) => {
  return (
    <div className={styles.card_content}>
      <RateStatistic to={id} />
      <Statistic title='Currency' value={id} />
      <Statistic title='Currency Description' value={description} />
    </div>
  )
}

export const CurrencyCard = ({ id = '', description = '' }) => {
  const { deleteExchange } = useExchanges();
  return (
    <Card 
      actions={[
        <DeleteFilled onClick={() => deleteExchange({id, description})} style={{fontSize: '1rem'}}/>,
        <EditFilled style={{fontSize: '1rem'}}/>
      ]}
    >
      <Collapse
        defaultActiveKey={['1']}
        ghost
        items={[
          {
            key: id,
            label: <Label id={id} description={description} />,
            children: <LineChart from='USD' to={id} />
          }
        ]}
      />
    </Card>
  )
}