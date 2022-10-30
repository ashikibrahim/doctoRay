import React from 'react'
import { useState } from 'react'
import {Drawer,IconButton,List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
const PAGES = ["Applydoctor", "Online consulting", "Make an appoitment", "Profile", "Login" ,"Logout"];
const DrawerComp = () => {

  const [openDrawer,setOpenDrawer] = useState(false)
  return (
  <React.Fragment>
    <Drawer open={openDrawer} onClose={()=> setOpenDrawer(false)}>
        <List>
          {
            PAGES.map((page,index)=>(
              <ListItemButton onClick={()=> setOpenDrawer(false)} key={index}>
                <ListItemIcon>
                    <ListItemText>{page}</ListItemText>
                </ListItemIcon>
            </ListItemButton>
            ))
          }
            
        </List>
    </Drawer>
    <IconButton sx={{color:"#1976D2",marginLeft:"auto" }} onClick={() => setOpenDrawer(!openDrawer)}>
    <MenuIcon/>
    </IconButton>
  </React.Fragment>
  )
}

export default DrawerComp;