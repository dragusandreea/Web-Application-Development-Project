export class Destination {
  id: string | undefined;
  description: string = "";
  location: string = "";
  price: number = 0;
  available_seats: number = 0;
  offer_percent: number = 0;
}



export interface DestinationDetails {
  id:string | undefined;
  description:string;
  location: string;
  price:number;
  available_seats:number;
  offer_percent:number;
  isEdit:boolean;
}

export const DestinationColumns = [
  {
    key: 'id',
    type: 'text',
    label: 'id',
    required: true,
  },
  {
    key: 'description',
    type: 'text',
    label: 'description',
    required: true,
  },
  {
    key: 'location',
    type: 'text',
    label: 'location',
    required: true,
  },
  {
    key: 'price',
    type: 'number',
    label: 'price',
    required: true,
  },
  {
    key: 'available_seats',
    type: 'number',
    label: 'available_seats',
    required: true,
  },
  {
    key: 'offer_percent',
    type: 'number',
    label: 'offer_percent',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
