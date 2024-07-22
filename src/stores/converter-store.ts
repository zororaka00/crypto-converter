import { defineStore } from 'pinia';

import { api } from 'src/boot/axios';
import { useGeneralStore } from './general-store';

interface IListLiquidStaking {
    api: string,
    label: string,
    value_apr: number,
    apr: string,
    url: string
}

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
    }>,
    list_liquid_staking: [
        {
            api: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
            label: 'Lido (stETH)',
            value_apr: 0,
            apr: '0%',
            url: 'https://stake.lido.fi/?ref=0x0fFee57EAA1026857E381BC51B6832735006fc6a'
        },
        // {
        //     api: 'https://stake.rocketpool.net/api/mainnet/payload',
        //     label: 'Rocketpool (rETH)',
        //     value_apr: 0,
        //     apr: '0%',
        //     url: 'https://stake.rocketpool.net/'
        // },
        {
            api: 'https://www.binance.info/bapi/earn/v1/public/pos/cftoken/project/getPurchasableProject',
            label: 'Binance ETH (BETH)',
            value_apr: 0,
            apr: '0%',
            url: 'https://www.binance.info/en/ethereum-staking'
        }
    ] as Array<IListLiquidStaking>
  }),
  actions: {
    getPrice() {
        const general = useGeneralStore();
        general.showLoading();
        api.get('https://www.binance.info/api/v3/ticker/price').then(async ({ data }) => {
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
    async getLiquidStaking() {
        const general = useGeneralStore();
        general.showLoading();
        try {
            const data_liquid_staking: any = await Promise.all(this.list_liquid_staking.map(async d => {
                if (d.label.includes('(sETH)')) {
                    const data_lido = await api.get(d.api);
                    console.log({data_lido})
                    const apr = +data_lido.data.data.smaApr;
                    return {
                        api: d.api,
                        label: d.label,
                        value_apr: apr,
                        apr: `${general.numberToString(apr, 2)}%`,
                        url: d.url
                    };
                }
                // else if (d.label.includes('(rETH)')) {
                //     const data_rocketpool = await api.get(d.api);
                //     const apr = +data_rocketpool.data.rethAPR;
                //     return {
                //         api: d.api,
                //         label: d.label,
                //         value_apr: apr,
                //         apr: `${general.numberToString(apr, 2)}%`,
                //         url: d.url
                //     };
                // }
                else if (d.label.includes('(BETH)')) {
                    const data_binance = await api.get(d.api);
                    const apr = +data_binance.data.data.annualInterestRate * 100;
                    return {
                        api: d.api,
                        label: d.label,
                        value_apr: apr,
                        apr: `${general.numberToString(apr, 2)}%`,
                        url: d.url
                    };
                }
            }));
            data_liquid_staking.sort((a: any, b: any) => b.value_apr - a.value_apr);
            this.list_liquid_staking = data_liquid_staking;
            general.hideLoading();
        } catch (error) {
            general.hideLoading();
        }
    }
  },
});
