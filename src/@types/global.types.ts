
export type User = {
  id: number;
  userName: string;
  fullName: string;
  lastLogin: Date;
  enabled: boolean;
};

export interface GridCell {
  dataItem: User;
}
