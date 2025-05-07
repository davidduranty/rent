
export interface PublicHoliday {
  id: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  image: string;
  transmition: string;
  place: number;
  available: boolean;
  type: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  publicHoliday: PublicHoliday;
  vehicles: Vehicle;
}
