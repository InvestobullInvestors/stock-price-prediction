import React from 'react'
import {
    MenuItem,
    MenuList, useColorModeValue
} from "@chakra-ui/react";
import NotificationItem from "../NotificationItem";

const CustomMenuItem = ({children, ...otherProps}) => (
    <MenuItem {...otherProps}>
        {children}
    </MenuItem>
)

const NotificationList = () => (
    <MenuList bg={useColorModeValue("brand.400", "brand.900")}>
        <CustomMenuItem><NotificationItem/></CustomMenuItem>
        <CustomMenuItem><NotificationItem/></CustomMenuItem>
        <CustomMenuItem><NotificationItem/></CustomMenuItem>
    </MenuList>
)

export default NotificationList;
