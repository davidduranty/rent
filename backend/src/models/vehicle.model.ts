export interface VehicleDTO {
    id?: number;
    brand: string;
    model: string;
    image: string;
    transmition: string;
    place: number;
    available: boolean;
    type: string;
    price?: string;
    description?: string;
}