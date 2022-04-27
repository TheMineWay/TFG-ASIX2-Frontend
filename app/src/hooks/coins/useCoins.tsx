import { Avatar, List, Tooltip } from 'antd';
import useCoinsPrice from './useCoinsPrice';

export default function useCoins() {
    
    const DisplayPrice = (props: {price: number}): JSX.Element => {
        const { coins } = useCoinsPrice();

        return (
            <Tooltip
                color='white'
                title={(
                    <List
                        style={{width: 300}}
                        itemLayout='horizontal'
                    >
                        {
                            coins.map((coin) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={coin.name}
                                        avatar={<Avatar src={coin.imageUrl}/>}
                                        description={coin.price * props.price}
                                    />
                                </List.Item>
                            ))
                        }
                    </List>
                )}
            >
                {`${Math.round(props.price * 100) / 100}€`}
            </Tooltip>
        );
    }

    return {
        DisplayPrice,
    };
}