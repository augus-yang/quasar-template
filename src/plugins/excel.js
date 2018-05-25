import XLSX from 'xlsx';

export default ({ Vue }) => {
  Vue.prototype.$excel = XLSX;
};
