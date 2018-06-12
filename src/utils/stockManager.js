import Storage from './storage';

// 自选股
const portfolioStorage = new Storage('portfolio');

export default {

  getPortfolioList() {
    //return portfolioStorage.getItem().catch(() => ['SH000001', 'SZ399001', 'SZ399006', 'SH601519']);
    return portfolioStorage.getItem().catch(() => []);
    //return portfolioStorage.getItem();
  },

  addPortfolio(obj) {
    return this.getPortfolioList().then((stocks) => {
      const result = stocks.filter(eachObj => eachObj !== obj);
      result.unshift(obj);
      return portfolioStorage.setItem(result);
    });
  },

  removePortfolio(obj) {
    return this.getPortfolioList().then((stocks) => {
      return portfolioStorage.setItem(stocks.filter(eachObj => eachObj !== obj));
    });
  },

  inPortfolio(obj) {
    return this.getPortfolioList().then((stocks) => {
      return stocks.indexOf(obj) >= 0;
    });
  },
  // 监听自选股变化
  onPortfolioChanged(callback) {
    return portfolioStorage.on('update', callback);
  },
};