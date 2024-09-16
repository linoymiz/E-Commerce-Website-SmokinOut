import {
  Box,
  Button,
  Card,
  Typography,
} from '@mui/material';
import { Product } from '../../../types';

type ItemActions = {
  deleteItem: (prodId: number) => void;
  handleSelectProduct: (prodId: number) => void
};
type ProductItemProps = { product: Product; actions: ItemActions };

export const ProductItem = ({ product, actions }: ProductItemProps) => {
  const { deleteItem, handleSelectProduct } = actions;

  return (
    <Card onClick={()=>{handleSelectProduct(product.id)}}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <Box style={{ width: '20%', padding: '10px' }}>
        <img
          width='100%'
          height='auto'
          src='https://media.istockphoto.com/id/1145782202/vector/vector-grocery-food-bag-icon.jpg?s=612x612&w=0&k=20&c=5rGVqvMqsNiVP4xALT5GsXrBWNfaQX0QLD9RZ8zAIRY='
          alt={product.name}
        />
      </Box>
      <Box style={{ flexGrow: 1 }}>
        <Typography component='div' variant='h5'>
          {product.name}
        </Typography>
        <Typography component='div' variant='subtitle1'>
          {product.description}
        </Typography>
      </Box>
      <Box style={{ alignSelf: 'end'}}>
        <Button onClick={() => deleteItem(product.id)}>Delete</Button>
      </Box>
    </Card>
  );
};
