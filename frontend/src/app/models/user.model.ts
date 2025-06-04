export interface User {
  id?: number;
  name?: string;
  surname?: string;
  email: string;
  password: string;
  birthday?: string;
  isAdmin?: boolean;
  professionnal?: boolean;
}
