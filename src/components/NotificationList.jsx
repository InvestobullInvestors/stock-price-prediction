import React from 'react';
import { MenuItem, Text } from '@chakra-ui/react';
import { SmallCloseIcon, Icon } from '@chakra-ui/icons';
import { useUser } from '../contexts/useUser';

const NotificationList = () => {
    const { notifications, deleteOneNotification } = useUser();

    if (notifications == null || notifications.length < 1)
        return <Text m={3}>No new notifications!</Text>;

    return notifications.map((item, id) => (
        <MenuItem
            key={id}
            onClick={() => deleteOneNotification(item.timestamp)}
        >
            <Text mx={2}>{item.text}</Text>
            <Icon as={SmallCloseIcon} />
        </MenuItem>
    ));
};

export default NotificationList;
