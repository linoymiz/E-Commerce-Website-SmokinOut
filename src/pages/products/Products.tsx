import { useProductsManager } from '../products/hooks/useProductsManager';
import { ProductItem } from './conponents/ProductItem';
import { ProductDetailsPanel } from './conponents/ProductsDetailsPanel';
import { ProductActionToolbar } from './conponents/ProductActionToolbar';
import { Box, Typography } from '@mui/material';

export const Products = () => {
  const {
    selectedProduct,
    products,
    filteredArray,
    isOnSearchMode,
    isOnNewItemMode,
    deleteItem,
    addItem,
    updateItem,
    searchQuery,
    selectedOption,
    handleSearchInputChange,
    handleSelectProduct,
    handleSelectOption,
    handleNewItemProcess,
  } = useProductsManager();

  const items = isOnSearchMode ? filteredArray : products;
  const productDetailsActions = { actions: { addItem, updateItem } };
  const disableDetailsPanel = !isOnNewItemMode && !selectedProduct;

  const DisplayItems = () => {
    if (items.length === 0)
      return (
        <Typography component='div' variant='h6'>
          No Items to Display...
        </Typography>
      );
    else {
      return (
        <Box>
          {items.map((product) => {
            const productItemActions = {
              actions: { deleteItem, handleSelectProduct },
            };
            return (
              <ProductItem
                key={product.id}
                product={product}
                {...productItemActions}
              />
            );
          })}
        </Box>
      );
    }
  };
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem', mt: 5 }}
    >
      <ProductActionToolbar
        searchInput={searchQuery}
        handleChange={handleSearchInputChange}
        selectedOption={selectedOption}
        handleSelect={handleSelectOption}
        handleNewItemClick={handleNewItemProcess}
      />
      <Box sx={{ display: 'flex', columnGap: '1rem', mt: 5 }}>
        <DisplayItems />
        <ProductDetailsPanel
            selectedProduct={selectedProduct}
            isOnNewItemMode={isOnNewItemMode}
            disabled={disableDetailsPanel}
            {...productDetailsActions}
          />
      </Box>
    </Box>
  );
};
