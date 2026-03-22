export const ORDER_KEY = 'gharkazaika:last-order';

export const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
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
