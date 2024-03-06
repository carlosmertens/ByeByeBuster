export interface IGenre {
  name: string;
  isActive: boolean;
  date: Date;
}

export interface ICustomer {
  name: string;
  phone: string;
  isGold: boolean;
  createdOn: Date;
}
export interface IMovie {
  title: string;
  genre: IGenre;
  numberInStock: number;
  dailyRentalRate: number;
}

export interface IRental {
  customer: {
    name: string;
    phone: string;
    isGold: boolean;
  };
  movie: {
    title: string;
    dailyRentalRate: number;
  };
  dateOut: Date;
  dateReturned: Date;
  rentalFee: number;
}
