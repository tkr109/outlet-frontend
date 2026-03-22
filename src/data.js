export const outlet = {
  name: 'Ghar Ka Zaika',
  tagline: 'Fresh, fiery, and built for the hungry.',
  description:
    'A fast food outlet concept for mobile-first ordering, quick takeaway, and doorstep delivery.',
  addressLine: 'Sector 12, Market Road, Indore',
  ownerName: 'Owner',
  ownerWhatsApp: '919999999999',
  takeawayTiming: '11:00 AM - 11:00 PM',
  deliveryTiming: '12:00 PM - 10:30 PM',
  socials: [
    { label: 'Instagram', handle: '@gharkazaika' },
    { label: 'Facebook', handle: '/gharkazaika' },
    { label: 'WhatsApp', handle: '+91 99999 99999' },
  ],
  specialties: [
    {
      name: 'Smoky Tandoori Wrap',
      blurb: 'Grilled, spicy, and packed for quick pickup.',
    },
    {
      name: 'Loaded Paneer Box',
      blurb: 'Comfort food with a rich house masala finish.',
    },
    {
      name: 'Crunch Burger Stack',
      blurb: 'A crisp, saucy burger built to travel well.',
    },
  ],
};

export const menu = [
  {
    category: 'Bites',
    items: [
      { id: 'garlic-fries', name: 'Garlic Fries', price: 89, note: 'Crispy and salted.' },
      { id: 'paneer-corn', name: 'Paneer Corn Pop', price: 129, note: 'Cheesy street-style snack.' },
      { id: 'chicken-wings', name: 'Masala Wings', price: 189, note: 'Hot glaze, big crunch.' },
    ],
  },
  {
    category: 'Mains',
    items: [
      { id: 'smoky-wrap', name: 'Smoky Tandoori Wrap', price: 149, note: 'Best for takeaway.' },
      { id: 'paneer-box', name: 'Loaded Paneer Box', price: 179, note: 'Rice, paneer, and gravy.' },
      { id: 'burger-stack', name: 'Crunch Burger Stack', price: 159, note: 'Built for one-handed eating.' },
    ],
  },
  {
    category: 'Drinks',
    items: [
      { id: 'mint-lemon', name: 'Mint Lemon Cooler', price: 69, note: 'Cold and refreshing.' },
      { id: 'cold-coffee', name: 'House Cold Coffee', price: 99, note: 'Smooth finish.' },
    ],
  },
];
