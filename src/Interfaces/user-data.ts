export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UpdateProfilePayload {
  name?: string;
  password?: string;
}
