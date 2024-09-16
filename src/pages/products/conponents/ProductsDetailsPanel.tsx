import { number, object, ObjectSchema, string } from 'yup';
import {
  Product,
  ProductFormFields,
  ProductFormFieldsMap,
  validationMessages,
} from '../../../types';
import { FormikValues, useFormik } from 'formik';
import {
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { generateId } from '../../../utils';
import { useEffect, useMemo, useRef } from 'react';

const DATE_FORMAT = 'YYYY-MM-DD';

const validationSchema: ObjectSchema<ProductFormFields> = object({
  name: string()
    .max(30, validationMessages.InvalidInput)
    .required(validationMessages.RequiredField),
  description: string().max(200, validationMessages.InvalidInput),
  price: number()
    .min(1, validationMessages.InvalidInput)
    .required(validationMessages.RequiredField),
});

const resetValues: ProductFormFields = {
  name: '',
  description: '',
  price: 0,
};

type ProductDetailsActions = {
  addItem: (item: Product) => void;
  updateItem: (item: Product) => void;
};

type ProductFormProps = {
  selectedProduct?: Product;
  isOnNewItemMode: boolean;
  disabled: boolean;
  actions: ProductDetailsActions;
};

const createNewItem = (values: FormikValues) => {
  const { name, description, price } = values;
  const currentDate = moment().format(DATE_FORMAT);
  const newItem: Product = {
    id: generateId(),
    name,
    description,
    price,
    creationDate: new Date(currentDate),
  };
  return newItem;
};

export const ProductDetailsPanel = ({
  selectedProduct,
  isOnNewItemMode,
  disabled,
  actions
}: ProductFormProps) => {

  const titleInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if(isOnNewItemMode && titleInputRef.current){
      formik.resetForm({values: resetValues});
      titleInputRef.current.focus();
    }
  }, [isOnNewItemMode])

  const {addItem, updateItem} = actions;
  
  const title = selectedProduct
    ? `${selectedProduct.name} Details`
    : 'New Product';
  const initialValues = useMemo(() => {
    if (selectedProduct)
      return {
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
      };
    else return resetValues;
  }, [selectedProduct]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      if (selectedProduct) {
        const isChanged = formik.dirty;
        if (isChanged) {
          const updatedItem: Product = {
            ...values,
            id: selectedProduct.id,
            creationDate: selectedProduct.creationDate,
          };
          updateItem(updatedItem);
        }
      } 
      else {
        const newItem = createNewItem(values);
        addItem(newItem);
      }
      actions.resetForm({ values: resetValues});
    },
  });

  return (
    <Box
      sx={{
        border: '1px solid',
        padding: '1rem',
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
        
      >
        <fieldset disabled={disabled} style={{border: 'none'}}>
        <Typography variant='h5'>{title}</Typography>
        <img
          width='40%'
          height='auto'
          src='https://media.istockphoto.com/id/1145782202/vector/vector-grocery-food-bag-icon.jpg?s=612x612&w=0&k=20&c=5rGVqvMqsNiVP4xALT5GsXrBWNfaQX0QLD9RZ8zAIRY='
          alt={'img'}
        />
        <StyledTextField
          fullWidth
          inputRef={titleInputRef}
          id={`form-field-${ProductFormFieldsMap.name}`}
          name={ProductFormFieldsMap.name}
          label={ProductFormFieldsMap.name}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <StyledTextField
          fullWidth
          multiline
          rows={4}
          id={`form-field-${ProductFormFieldsMap.description}`}
          name={ProductFormFieldsMap.description}
          label={ProductFormFieldsMap.description}
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder={validationMessages.Optional}
        />
        <Box display='flex' gap={1} alignItems='center'>
          <StyledTextField
            sx={{ width: '30%' }}
            id={`form-field-${ProductFormFieldsMap.price}`}
            name={ProductFormFieldsMap.price}
            label={ProductFormFieldsMap.price}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <Typography sx={{ marginBottom: '20px' }}>$</Typography>
        </Box>
        <Button type='submit' disabled={!(formik.dirty && formik.isValid)}>Save</Button>
        </fieldset>
      </form>
    </Box>
  );
};

const StyledTextField = styled(TextField)(() => ({
  marginBottom: '20px',
}));
