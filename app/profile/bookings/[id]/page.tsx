export default function BookingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Booking Details</h1>
      <p>Details for booking {params.id}.</p>
    </div>
  );
}