import { defineStore } from 'pinia';

import { api } from 'src/boot/axios';
import { useGeneralStore } from './general-store';

export const useConverterStore = defineStore('converter', {
  state: () => ({
    options: [
        'Bitcoin (BTC)',
        'Ethereum (ETH)',
        'Solana (SOL)',
        'Binance Coin (BNB)'
    ],
    list_prices: [] as Array<{
        cryptocurrency: string,
        symbol: string,
        to_usd: string
    }>
  }),
  actions: {
    getPrice() {
        const general = useGeneralStore();
        general.showLoading();
        api.get('ticker/price').then(async ({ data }) => {
            this.list_prices = await Promise.all(this.options.map(async d => {
                const match = d.match(/\(([^)]+)\)/);
                const index = await data.findIndex((fd: any) => fd.symbol == `${(match as any)[1]}USDT`);
                return {
                    cryptocurrency: d,
                    symbol: (match as any)[1],
                    to_usd: general.numberToString(data[index].price, 4)
                };
            }));
            general.hideLoading();
        }).catch(()=> {
            setTimeout(() => {
                general.hideLoading();
                this.getPrice();
            }, 1000);
        });
    },
  },
});
