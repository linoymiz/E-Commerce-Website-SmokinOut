import {
  ChangeEvent,
  useDeferredValue,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Product, SelectOptionValue } from '../../../types';
import { productsData } from '../../../products.mock';

type Action =
  | { type: 'Add', payload: { newItem: Product } }
  | { type: 'Delete', payload: { itemId: number } }
  | { type: 'Update', payload: { modifiedItem: Product } }
  | { type: 'Sort', payload: { sortOption: SelectOptionValue } }

const reducer = (items: Product[], action: Action): Product[] => {
  switch (action.type) {
    case 'Add': {
      const newItem = action.payload.newItem;
      return [...items, newItem];
    }
    case 'Delete': {
      const itemIdToDelete = action.payload.itemId;
      const updatedArray = items.filter((item) => item.id !== itemIdToDelete);
      return updatedArray;
    }
    case 'Update': {
      const updatedItem = action.payload.modifiedItem;
      const updatedArray =  items.map(item => item.id === updatedItem.id ? updatedItem : item);
      return updatedArray;
    }
    case 'Sort':{
      const sortKey = action.payload.sortOption;
      // console.log(`first item sorted by ${sortKey} is: ${items[0][sortKey]}`) 
      items.sort((itemA, itemB) => {
        if (typeof itemA[sortKey] === 'string' && typeof itemB[sortKey] === 'string') {
          return itemA[sortKey].localeCompare(itemB[sortKey]);
        }
        if(itemA[sortKey] > itemB[sortKey])
          return -1;
        else if(itemA[sortKey] < itemB[sortKey])
          return 1;
        else return 0;
      }
        );
      return items;
    }
  }
};

export const useProductsManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);
  const [selectedOption, setSelectedOption] = useState<SelectOptionValue>();
  const [isOnSearchMode, setIsOnSearchMode] = useState(false);
  const [filteredArray, setFilteredArray] = useState<Product[]>([]);
  const [products, dispatch] = useReducer(reducer, productsData);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isOnNewItemMode, setIsOnNewItemMode] = useState(false);


  useEffect(() => {
    handleSearch();
  }, [deferredQuery]);

  const handleSelectProduct = (prodId: number) => {
    const prodSelected = products.find(prod => prod.id === prodId)
    setSelectedProduct(prodSelected);
  }

  const addItem = (item: Product) => {
    dispatch({ type: 'Add', payload: { newItem: item } });
    setIsOnNewItemMode(false);
  };

  const updateItem = (item: Product) => {
    setIsOnNewItemMode(false);
    dispatch({ type: 'Update', payload: {modifiedItem: item}})
    setSelectedProduct(undefined);
  }

  const deleteItem = (itemId: number) => {
    dispatch({ type: 'Delete', payload: { itemId } });
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery === '') setIsOnSearchMode(false);
    else {
      setIsOnSearchMode(true);
      const filteredArray = products.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery);
      });
      setFilteredArray(filteredArray);
    }
  };

  const handleSelectOption = (selectedOption: SelectOptionValue) => {
    setSelectedOption(selectedOption);
    dispatch({type: 'Sort', payload: {sortOption: selectedOption}})
  }

  const handleNewItemProcess = () => {
    setSelectedProduct(undefined);
    setIsOnNewItemMode(true);
  }

  return {
    selectedProduct,
    products,
    filteredArray,
    isOnSearchMode,
    isOnNewItemMode,
    addItem,
    updateItem,
    deleteItem,
    searchQuery,
    selectedOption, 
    handleSearchInputChange,
    handleSelectProduct,
    handleSelectOption,
    handleNewItemProcess
  };
};
