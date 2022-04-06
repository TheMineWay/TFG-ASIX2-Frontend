import React, { useEffect, useState } from 'react'
import CoinsService, { Coin } from '../../services/coins/CoinsService'

export default function useCoinsPrice() {

    const [coins, setCoins] = useState<Coin[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setCoins(await CoinsService.getCoins());
    }

    return {
        coins,
    };
}