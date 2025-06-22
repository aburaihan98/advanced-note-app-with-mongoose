import { Model } from "mongoose";

export interface IAddress {
  city: string;
  zip: number;
}
export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  address: IAddress;
}

export interface userInstanceMethod {
  hashPassword(password: string): Promise<string>;
}

export interface userStaticMethod extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}
