// Booking model generated from backend DTO
export interface Booking {
	id: string;
	guestId: string;
	hotelRoomId: string;
	checkInDate: string; // ISO date string
	checkOutDate: string; // ISO date string
	// Additional properties can be added as needed
}
