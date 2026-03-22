export const outlet = {
  name: 'P. Corner',
  tagline: 'Traditional Greek flavors, contemporary soul.',
  description: 'A mobile-first food outlet for quick takeaway and doorstep delivery.',
  addressLine: 'Pissouri, Cyprus',
  addressLabel: 'Ellados 1 & Paleou Schoilou Corner, Pissouri 4608, Cyprus',
  ownerName: 'Owner',
  ownerWhatsApp: '35794562759',
  takeawayTiming: '15:30 - 22:00',
  deliveryTiming: '18:00 - 21:00',
  closedDay: 'Tuesday',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Ellados%201%20%26%20Paleou%20Schoilou%20Corner%2C%20Pissouri%204608%2C%20Cyprus&output=embed',
  googleMapsPlaceUrl:
    'https://www.google.com/maps/search/?api=1&query=Ellados%201%20%26%20Paleou%20Schoilou%20Corner%2C%20Pissouri%204608%2C%20Cyprus',
  socials: [
    { label: 'Phone 1', handle: '99-955764' },
    { label: 'Phone 2', handle: '99-166646' },
  ],
  socialLinks: [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/35794562759',
      icon: 'forum',
    },
    {
      label: 'Call',
      href: 'tel:+35799166646',
      icon: 'call',
    },
    {
      label: 'Tripadvisor',
      href: 'https://www.tripadvisor.com/Restaurant_Review-g616081-d4090499-Reviews-P_Corner_Take_Away-Pissouri_Limassol.html',
      icon: 'travel_explore',
    },
  ],
  specialties: ['P Corner Special', 'Sheftalia', 'Halloumi Portion'],
};

export const homepage = {
  featuredItemIds: ['portion-mix', 'beef-burger', 'souv-chicken-doner'],
  reviews: [
    {
      quote: 'Locals praise the generous kebabs, delivery convenience, and easy village pickup.',
      author: 'Dianne52',
      source: 'Tripadvisor',
      date: 'Sep 2020',
      rating: 5,
    },
    {
      quote: 'Guests highlight the strong value, fresh chicken, salad, chips, and wide takeaway choice.',
      author: 'Lyn H',
      source: 'Tripadvisor',
      date: 'Apr 2013',
      rating: 5,
    },
    {
      quote: 'Recent visitors describe it as a family-run stop with first-class food at a great price.',
      author: 'jimbob0721',
      source: 'Tripadvisor',
      date: 'Aug 2024',
      rating: 5,
    },
  ],
};

export const menu = [
  {
    category: 'Starters',
    greek: 'Ορεκτικά',
    items: [
      { id: 'large-salad', name: 'Large Salad', greek: 'Σαλάτα μεγάλη', price: 5.0, note: 'Fresh Mediterranean seasonal greens.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop' },
      { id: 'tuna-salad', name: 'Tuna Salad', greek: 'Τονοσαλάτα', price: 6.5, note: 'Premium tuna with crisp garden vegetables.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop' },
      { id: 'coleslaw', name: 'Coleslaw', price: 3.0, note: 'Classic cream.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2000&auto=format&fit=crop' },
      { id: 'tachini', name: 'Tachini', greek: 'Ταχίνι', price: 1.0, note: 'Authentic dip.', image: 'https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?q=80&w=2000&auto=format&fit=crop' },
      { id: 'tirokafteri', name: 'Tirokafteri', greek: 'Τυροκαφτερή', price: 1.0, note: 'Spicy cheese dip.', image: 'https://images.unsplash.com/photo-1674316206411-52408f9a5b5d?q=80&w=2000&auto=format&fit=crop' },
      { id: 'tzatziki', name: 'Tzatziki', greek: 'Τζατζίκι', price: 1.0, note: 'Cool yogurt dip.', image: 'https://images.unsplash.com/photo-1591120583691-49d2741e55da?q=80&w=2000&auto=format&fit=crop' },
      { id: 'yoghurt', name: 'Yoghurt', greek: 'Γιαούρτι', price: 1.0, note: 'Plain Greek yoghurt.', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2000&auto=format&fit=crop' },
    ],
  },
  {
    category: 'Burgers',
    greek: 'Χάμπουργκερ',
    note: '*Served with Chips',
    items: [
      { id: 'pork-burger', name: 'Pork Burger*', price: 6.0, note: '*Served with chips', image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=2000&auto=format&fit=crop' },
      { id: 'beef-burger', name: 'Beef Burger*', price: 7.0, note: '*Served with chips', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop' },
      { id: 'cheese-burger', name: 'Cheese Burger*', price: 6.0, note: '*Served with chips', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=2000&auto=format&fit=crop' },
      { id: 'chicken-burger', name: 'Chicken Burger*', price: 6.0, note: '*Served with chips', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=2000&auto=format&fit=crop' },
      { id: 'vegie-burger', name: 'Vegie Burger', price: 6.0, note: 'Plant-based patty', image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2000&auto=format&fit=crop' },
    ],
  },
  {
    category: 'Sandwiches',
    greek: 'Σάντουιτς',
    items: [
      { id: 'sandwich', name: 'Sandwich', price: 5.0, note: 'Bacon, ham, lountza, halloumi.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2000&auto=format&fit=crop' },
      { id: 'sandwich-chips', name: 'Sandwich & Chips', price: 6.0, note: 'With a side of chips.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop' },
      { id: 'hot-dog', name: 'Hot Dog', greek: 'Χοτ Ντόγκ', price: 3.5, note: 'Classic style.', image: 'https://images.unsplash.com/photo-1619740455993-9d91b79f3093?q=80&w=2000&auto=format&fit=crop' },
      { id: 'hot-dog-chips', name: 'Hot Dog & Chips', price: 4.5, note: 'With a side of chips.', image: 'https://images.unsplash.com/photo-1619740455993-9d91b79f3093?q=80&w=2000&auto=format&fit=crop' },
      { id: 'kebab-sandwich', name: 'Kebab', greek: 'Κεμπάπ', price: 5.0, note: 'In fresh bread.', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=2000&auto=format&fit=crop' },
    ],
  },
  {
    category: 'Portions',
    greek: 'Μερίδες',
    note: 'Includes Chips and Salad',
    items: [
      { id: 'portion-pork-kebab', name: 'Pork Kebab', greek: 'Σουβλάκι Χοιρινό', price: 10.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2000&auto=format&fit=crop' },
      { id: 'portion-chicken-kebab', name: 'Chicken Kebab', greek: 'Σουβλάκι Κοτόπουλο', price: 10.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop' },
      { id: 'portion-sheftalia', name: 'Sheftalia', greek: 'Σιεφταλιές', price: 10.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2000&auto=format&fit=crop' },
      { id: 'portion-mix', name: 'Mix', greek: 'Μιξ', price: 10.0, note: 'With chips & salad.', popular: true, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=2000&auto=format&fit=crop' },
      { id: 'portion-chicken-doner', name: 'Chicken Doner', greek: 'Γύρος Κοτόπουλο', price: 10.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=2000&auto=format&fit=crop' },
      { id: 'portion-mixed-doner', name: 'Mixed Doner', greek: 'Γύρος Μιξ', price: 10.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=2000&auto=format&fit=crop' },
      { id: 'portion-pork-doner', name: 'Pork Doner', greek: 'Γύρος Χοιρινός', price: 10.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2000&auto=format&fit=crop' },
      { id: 'portion-halloumi', name: 'Halloumi Portion', greek: 'Χαλλούμι μερίδα', price: 12.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop' },
      { id: 'chicken-nuggets', name: 'Chicken Nuggets', greek: 'Κοτομπουκιές', price: 7.0, note: 'With chips & salad.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=2000&auto=format&fit=crop' },
    ],
  },
  {
    category: 'Souvlaki & Doner',
    greek: 'Σουβλάκι και Γύρος',
    special: { name: 'P Corner Special', normalPrice: 5.0, largePrice: 8.0, note: 'Our signature creation with secret spice blend.' },
    items: [
      { id: 'souv-pork-kebab', name: 'Pork Kebab', greek: 'Σουβλάκι Χοιρινό', price: 6.0, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-chicken-kebab', name: 'Chicken Kebab', greek: 'Σουβλάκι Κοτόπουλο', price: 6.5, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-sieftalia', name: 'Sieftalia', greek: 'Σιεφταλιά', price: 6.0, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-mix', name: 'Mix', greek: 'Μιξ', price: 6.0, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-falafel', name: 'Falafel', greek: 'Φαλάφελ', price: 6.0, image: 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-chicken-doner', name: 'Chicken Doner', greek: 'Γύρος Κοτόπουλο', price: 6.0, image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-mixed-doner', name: 'Mixed Doner', greek: 'Γύρος Μιξ', price: 6.0, image: 'https://images.unsplash.com/photo-1561651188-d207bbec4ec3?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-pork-doner', name: 'Pork Doner', greek: 'Γύρος Χοιρινός', price: 6.0, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2000&auto=format&fit=crop' },
      { id: 'souv-halloumi', name: 'Halloumi', greek: 'Χαλλούμι', price: 7.0, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2000&auto=format&fit=crop' },
    ],
  },
  {
    category: 'Drinks',
    greek: 'Ποτά',
    items: [
      { id: 'soft-drinks', name: 'Soft Drinks 330ml', greek: 'Αναψυκτικά', price: 2.0, image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=2000&auto=format&fit=crop' },
      { id: 'water', name: 'Water 0.5lt', greek: 'Νερό μικρό', price: 0.5, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=2000&auto=format&fit=crop' },
      { id: 'ice-tea', name: 'Ice Tea 330ml', greek: 'Παγωμένο Τσάι', price: 1.5, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2000&auto=format&fit=crop' },
      { id: 'juices', name: 'Juices 250ml', greek: 'Χυμοί', price: 1.0, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=2000&auto=format&fit=crop' },
      { id: 'hell', name: 'Hell 250ml', price: 1.5, image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=2000&auto=format&fit=crop' },
    ],
  },
  {
    category: 'Sides',
    greek: 'Διάφορα',
    items: [
      { id: 'small-chips', name: 'Small Portion Chips', greek: 'Μικρή μερίδα πατάτες', price: 2.0, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=2000&auto=format&fit=crop' },
      { id: 'large-chips', name: 'Large Portion Chips', greek: 'Μεγάλη μερίδα πατάτες', price: 3.0, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=2000&auto=format&fit=crop' },
      { id: 'xl-chips', name: 'XL Portion Chips', greek: 'XL Μερίδα πατάτες', price: 4.0, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=2000&auto=format&fit=crop' },
      { id: 'onion-rings', name: 'Onion Rings', greek: 'Ροδέλες κρεμμυδιού', price: 3.0, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=2000&auto=format&fit=crop' },
      { id: 'chips-cheese', name: 'Chips w/cheese', greek: 'Πατάτες με τυρί', price: 5.0, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=2000&auto=format&fit=crop' },
    ],
  },
];
