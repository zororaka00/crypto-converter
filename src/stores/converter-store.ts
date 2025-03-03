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
            api: 'https://www.marketwebb.blue/bapi/earn/v1/public/pos/cftoken/project/getPurchasableProject',
            label: 'Binance ETH (BETH)',
            value_apr: 0,
            apr: '0%',
            url: 'https://www.binance.com/en/ethereum-staking'
        },
        {
            api: 'https://meth.mantle.xyz/api/stats/apy',
            label: 'Mantle (mETH)',
            value_apr: 0,
            apr: '0%',
            url: 'https://meth.mantle.xyz/stake'
        },
        // {
        //     api: 'https://quest-api.puffer.fi/puffer-quest/home/staked_data',
        //     label: 'Puffer Finance (pufETH)',
        //     value_apr: 0,
        //     apr: '0%',
        //     url: 'https://quest.puffer.fi/home'
        // }
        {
            api: 'https://api.frax.finance/v2/frxeth/summary/latest',
            label: 'Frax Ether (frxETH)',
            value_apr: 0,
            apr: '0%',
            url: 'https://app.frax.finance/frxeth/mint'
        },
        {
            api: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
            label: 'Stakestone (STONE)',
            value_apr: 0,
            apr: '0%',
            url: 'https://app.stakestone.io/u/stake'
        },
        {
            api: 'https://v3-lrt.svc.swellnetwork.io/api/tokens/rsweth/apr',
            label: 'Swell (rswETH)',
            value_apr: 0,
            apr: '0%',
            url: 'https://app.swellnetwork.io/restake'
        }
    ] as Array<IListLiquidStaking>
  }),
  actions: {
    getPrice() {
        const general = useGeneralStore();
        general.is_indonesia = navigator.language == 'id-ID';
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
                if (d.label.includes('(stETH)') || d.label.includes('(STONE)')) {
                    const data_lido = await api.get(d.api);
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
                } else if (d.label.includes('(mETH)')) {
                    const data_mantle = await api.get(d.api);
                    const apr = +data_mantle.data.data[0].FiveDayAPY * 100;
                    return {
                        api: d.api,
                        label: d.label,
                        value_apr: apr,
                        apr: `${general.numberToString(apr, 2)}%`,
                        url: d.url
                    };
                }
                // else if (d.label.includes('(pufETH)')) {
                //     const data_puffer = await api.get(d.api);
                //     const apr = +data_puffer.data.data.apy;
                //     return {
                //         api: d.api,
                //         label: d.label,
                //         value_apr: apr,
                //         apr: `${general.numberToString(apr, 2)}%`,
                //         url: d.url
                //     };
                // }
                else if (d.label.includes('(frxETH)')) {
                    const data_frax = await api.get(d.api);
                    const apr = +data_frax.data.sfrxethApr;
                    return {
                        api: d.api,
                        label: d.label,
                        value_apr: apr,
                        apr: `${general.numberToString(apr, 2)}%`,
                        url: d.url
                    };
                } else if (d.label.includes('(rswETH)')) {
                    const data_swell = await api.get(d.api);
                    console.log({data_swell})
                    const apr = +data_swell.data;
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
