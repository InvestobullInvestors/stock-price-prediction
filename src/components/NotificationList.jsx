import React from "react";
import { MenuItem, Text } from "@chakra-ui/react";
import { FaDotCircle } from "react-icons/fa";
import { useUser } from "../contexts/useUser";

const NotificationList = () => {
    const { notifications } = useUser();

    if (notifications == null || notifications.length < 1)
        return <Text m={3}>You have no notifications!</Text>;

    return notifications.map((item, id) => (
        <MenuItem
            key={id}
            icon={
                <FaDotCircle
                    color={item.viewed ? "transparent" : "brand"}
                    size={8}
                />
            }
        >
            <Text color={item.viewed ? "brand.500" : "brand"}>{item.text}</Text>
        </MenuItem>
    ));
};

export default NotificationList;
