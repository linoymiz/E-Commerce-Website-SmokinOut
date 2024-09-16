import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, InputBase, InputLabel, MenuItem, Select, Toolbar } from '@mui/material';
import { SelectOptionList, SelectOptionValue } from '../../../types';

type ActionToolbarProps = {
    searchInput: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    selectedOption?: SelectOptionValue,
    handleSelect: (selectedOption: SelectOptionValue) => void,
    handleNewItemClick: () => void
}

export const ProductActionToolbar = ({searchInput, handleChange, selectedOption, handleSelect, handleNewItemClick}: ActionToolbarProps) => {
  return (
    <Box>
        <Toolbar>
            <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', width: '60%'}}>
                <Button color='success' variant='contained' onClick={handleNewItemClick}>+ Add</Button>
                <Box sx={{display:'flex', alignItems:'center', border: '0.5px solid', borderRadius: '1rem', pl: 2}}>
                    <SearchIcon />
                    <InputBase placeholder='Search...'
                        value={searchInput}
                        onChange={handleChange}
                    />
                </Box>
                <FormControl sx={{ m: 1, minWidth: 90 }}>
                    <InputLabel>Sort</InputLabel>
                    <Select sx={{borderRadius: '3rem' }} label={'Sort'} value={selectedOption} onChange={(e) => handleSelect(e.target.value as SelectOptionValue)}>
                        {SelectOptionList.map(option => 
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
        </Toolbar>
    </Box>
  );
};
