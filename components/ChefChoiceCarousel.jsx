'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const carouselItems = [
  {
    id: 1,
    title: 'Smoked Truffle Rib-Eye',
    description: 'Traditional Greek flavors, contemporary soul.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2000&auto=format&fit=crop',
    tag: "Chef's Choice",
  },
  {
    id: 2,
    title: 'Wagyu Beef Burger',
    description: 'Double patty with aged cheddar and caramelized onions.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop',
    tag: "Signature",
  },
  {
    id: 3,
    title: 'Wood-Fired Pizza',
    description: 'Authentic Neapolitan crust with San Marzano tomatoes.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop',
    tag: "Classic",
  },
  {
    id: 4,
    title: 'Mediterranean Salad',
    description: 'Fresh seasonal greens with feta and kalamata olives.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop',
    tag: "Fresh",
  },
  {
    id: 5,
    title: 'Artisanal Pasta',
    description: 'Hand-rolled daily with organic semolina and rich ragu.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2000&auto=format&fit=crop',
    tag: "Special",
  },
  {
    id: 6,
    title: 'Grilled Seafood',
    description: 'Fresh local catch with lemon-herb butter.',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=2000&auto=format&fit=crop',
    tag: "Premium",
  }
];

export default function ChefChoiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const currentItem = carouselItems[currentIndex];

  return (
    <div className="relative h-[480px] w-full rounded-[32px] overflow-hidden group">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              index === currentIndex ? 'scale-100' : 'scale-105'
            }`}
            src={item.image}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-20" />
      
      {/* Dots indicator */}
      <div className="absolute top-6 right-6 z-30 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-6 right-6 space-y-4 z-30">
        <span className="inline-block px-4 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label text-[10px] uppercase tracking-[1px] font-bold transition-all duration-500">
          {currentItem.tag}
        </span>
        <h2 
          key={`title-${currentIndex}`}
          className="font-headline text-[36px] font-extrabold tracking-[-0.9px] leading-[36px] text-white animate-fade-in-up"
        >
          {currentItem.title.split(' ').map((word, i, arr) => (
            i === arr.length - 2 ? <span key={i}>{word}<br /></span> : <span key={i}>{word} </span>
          ))}
        </h2>
        <p 
          key={`desc-${currentIndex}`}
          className="font-body text-white/90 text-sm leading-5 max-w-[280px] animate-fade-in-up delay-75"
        >
          {currentItem.description}
        </p>
        <Link
          href="/order"
          className="liquid-gradient block w-full py-4 rounded-full font-headline font-bold text-[16px] text-on-primary-container text-center shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}
