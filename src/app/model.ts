export interface OrderInstructions {
  instructions: string[];
  priority: number;
}

export interface Role {
  id: number;
  name: string;
  image: string;
  ownStatusIds: number[];
  othersStatusIds: number[];
  initialStatusIds?: number[];
  getInstructions?: (number) => OrderInstructions;
}

export interface Player {
  name: string;
  roleId: number;
  dead: boolean;
  statusIds: number[];
}

export interface Status {
  id: number;
  actionName: string;
  deleteActionName: string;
  icon: string;
  class?: string;
  noCompatibleWith: number[];
  name: string;
}



