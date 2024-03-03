export interface IGenre {
  name: String;
  isActive: Boolean;
  date: Date;
}

export interface ICustomer {
  name: String;
  phone: String;
  isGold: Boolean;
  createdOn: Date;
}
export interface IMovie {
  title: String;
  genre: IGenre;
  numberInStock: Number;
  dailyRentalRate: Number;
}
