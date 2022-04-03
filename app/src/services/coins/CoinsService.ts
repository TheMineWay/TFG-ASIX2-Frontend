// Servei d'interacció amb monedes
// Els valors d'entrada són sempre Euros

import axios, { AxiosRequestConfig } from "axios";

export type Coin = {
    name: string;
    imageUrl: string;
    price: number; // Equivalent to 1 EUR
}

export default class CoinsService {

    static coinsList: {
        name: string;
    }[] = [
            {
                name: "bitcoin",
            },
            {
                name: "ethereum",
            },
            {
                name: "litecoin",
            },
            {
                name: "cardano",
            },
            {
                name: "polkadot",
            },
            {
                name: "qtum",
            },
            {
                name: 'dogecoin',
            },
            {
                name: 'solana',
            },
            {
                name: 'monero',
            },
        ];

    static async getCoins(): Promise<Coin[]> {
        let coins: Coin[] = [];

        for (const coin of this.coinsList) {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: `https://api.coingecko.com/api/v3/coins/${coin.name}`,
                headers: {},
            };

            const result = await axios(config);

            const data: {
                id: string;
                symbol: string;
                name: string;
                image: { small: string; large: string; thumb: string; };
                market_data: {
                    current_price: {
                        eur: number;
                    }
                }
            } = result.data;

            coins.push({
                name: coin.name,
                imageUrl: data.image.small,
                price: 1 / data.market_data.current_price.eur,
            });
        }

        return coins;
    }

}