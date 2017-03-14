export interface Role {
  id: number;
  name: string;
  image: string;
  ownStatusIds: number[];
  othersStatusIds: number[];
}

export interface Player {
  name: string;
  roleId: number;
  dead: boolean;
  statusValueIds: number[];
}

export interface Status {
  id: number;
  name: string;
  valueIds: number[];
}

export interface StatusValue {
  id: number;
  statusId: number;
  name: string;
  actionName: string;
  icon?: string;
  class?: string;
}



