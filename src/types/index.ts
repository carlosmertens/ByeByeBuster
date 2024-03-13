export type TGenre = { name: string };

export type TCustomer = {
  name: string;
  phone: string;
  isGold: boolean;
};

export type TMovie = {
  title: string;
  genre: TGenre;
  numberInStock: number;
  dailyRentalRate: number;
};

export type TRental = {
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
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  generateAuthToken: () => string;
};

export type TUserAuth = {
  email: string;
  password: string;
};
