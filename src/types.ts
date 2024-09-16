export type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    creationDate: Date;
  };

  export type ProductFormFields = Pick<Product, 'name' | 'description' | 'price'>
  type ProductFormFieldsMapType = {
    [Property in keyof ProductFormFields] -?: Property
  }
  export const ProductFormFieldsMap: ProductFormFieldsMapType = {
    name: 'name',
    description: "description",
    price: "price"
  };
  
  type SelectOptionLabel = 'Name' | 'Recently Added';
  export type SelectOptionValue = keyof (Pick<Product, "name" | "creationDate">);

  export type Option = {
    label: SelectOptionLabel,
    value: SelectOptionValue
  }

  export const SelectOptionList: Option[] = [
    {label: 'Name', value: 'name'},
    {label: 'Recently Added', value: 'creationDate'}
  ]

  export const validationMessages = {
    Optional: 'Optional',
    RequiredField: 'This field is required',
    InvalidInput: 'Invalid Input'
  }


  