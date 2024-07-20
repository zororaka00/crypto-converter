import { defineStore } from 'pinia';
import { useQuasar, QSpinnerFacebook, Notify } from 'quasar';
import BigNumber from 'bignumber.js';

export const useGeneralStore = defineStore('general', {
  state: () => ({
    uq: useQuasar(),
    menu: 'home',
    is_mobile: false,
  }),
  actions: {
    showLoading() {
      this.uq.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary',
        spinnerSize: 140,
        backgroundColor: 'yellow',
        messageColor: 'black'
      });
    },
    hideLoading() {
      this.uq.loading.hide();
    },
    showNotif(type: string, message: string, timeout?: number) {
      Notify.create({
        type,
        message,
        position: 'top',
        timeout: timeout ?? 2000
      });
    },
    copyClipboard(textData: string, customText?: string) {
      const element = document.createElement('textarea');
      element.value = textData;
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(element);
      this.showNotif('positive', customText ? customText : `${textData} copied`);
    },
    refresh() {
      window.location.reload();
    },
    toUrl(url: string) {
      (window as any).open(url, '_blank').focus();
    },
    numberToString(value: number | string, decimal: number): string {
      const newValue = new BigNumber(value);
      const convertString = newValue.toFixed(decimal);
      return parseFloat(convertString) > 0 ? convertString.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '') : '0';
    }
  },
});
