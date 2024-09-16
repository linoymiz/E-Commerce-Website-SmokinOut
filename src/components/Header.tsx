import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import StorefrontIcon from '@mui/icons-material/Storefront';

export const Header = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar> 
        <Toolbar>
          <IconButton edge='start' color='inherit' sx={{mr: 2}}>
            <StorefrontIcon /> 
          </IconButton>
          <Typography variant="h6">My Store</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}