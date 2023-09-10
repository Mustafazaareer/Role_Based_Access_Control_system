export namespace USER {
  export interface Item {
    id: string;
    userName: string;
    email: string;
    password: string;
    role:number[];
    createdAt: Date;
  }
  export interface Role {
    id: number;
    name: string;
    permissions: number[];
  }

  export interface Permission {
    id: number;
    name: string;
  }

  export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    DOB: Date;
  }
}