export const SITE_ACTIVE = 1; // 1 = site is live, 0 = site is down

export const ORDER_KEY = 'pcorner:last-order';

export const currency = new Intl.NumberFormat('en-CY', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

export const emptyCustomer = {
  name: '',
  phone: '',
  orderType: 'takeaway',
  address: '',
  landmark: '',
  city: '',
  pincode: '',
  notes: '',
};
