import { Avatar, List, Tooltip } from 'antd';
import { t } from 'i18next';
import useCoinsPrice from './useCoinsPrice';

export default function useCoins() {

    const DisplayPrice = (props: { price: number }): JSX.Element => {
        const { coins } = useCoinsPrice();

        const iva = 21;
        const price = Math.round(props.price * 100) / 100;
        const priceWithIva = Math.round(((price * (iva / 100)) + price) * 100) / 100;

        const showIva = true;

        return (
            <Tooltip
                color='white'
                title={(
                    <List
                        style={{ width: 300 }}
                        itemLayout='horizontal'
                    >
                        {
                            coins.map((coin) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={coin.name}
                                        avatar={<Avatar src={coin.imageUrl} />}
                                        description={coin.price * props.price}
                                    />
                                </List.Item>
                            ))
                        }
                    </List>
                )}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: 5,
                    }}
                >
                    <p>{priceWithIva}€</p>
                    {
                        showIva && (
                            <small>{t('common.other.WithoutIva')}: {price}€</small>
                        )
                    }
                </div>
            </Tooltip>
        );
    }

    return {
        DisplayPrice,
    };
}