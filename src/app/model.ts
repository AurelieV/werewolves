export interface Role {
  id: number;
  name: string;
  image: string;
  ownStatus: Status[];
  othersStatus: Status[];
}

export interface Player {
  name: string;
  role: Role;
  dead: boolean;
  status: PlayerStatus[];
}

export interface StatusIconValue {
  icon: string;
  class: string;
}

export interface StatusValue {
  name: string;
  iconValue: StatusIconValue;
  actionName?: string;
}

export interface Status {
  name: string;
  values: StatusValue[];
}

export interface PlayerStatus {
  status: Status;
  value: StatusValue;
}