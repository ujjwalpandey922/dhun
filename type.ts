export interface AdminType {
  amount: {
    category_6: number;
    category_7: number;
    category_8: number;
    category_9: number;
    category_10: number;
  };
  charge_customers: boolean;
  id: number;
  location: string;
  name: string;
}
export interface InputType {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  disabled: boolean;
  width?: string;
}
export interface ButtonType {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  text: string;
}
