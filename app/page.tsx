'use client';
import { useHotels } from '../lib/hooks';
import { HotelCard } from '../components/hotel-card';

export default function Home() {
  const { data: hotels, isLoading } = useHotels();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Find Your Stay</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels?.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
