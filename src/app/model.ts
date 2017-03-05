export interface Role {
  id: number;
  name: string;
  image: string;
}

export interface Player {
  name: string;
  role: Role;
}