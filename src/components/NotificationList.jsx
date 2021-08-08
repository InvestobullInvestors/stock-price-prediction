import React from 'react';
import { Button, MenuItem, Text } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useUser } from '../contexts/useUser';

const NotificationList = () => {
    const { notifications, deleteOneNotification } = useUser();

    if (notifications == null || notifications.length < 1)
        return <Text m={3}>No new notifications!</Text>;

    return notifications.map((item, id) => (
        <MenuItem key={id} _hover={{ cursor: 'default' }}>
            <Text mx={2}>{item.text}</Text>
            <Button
                as={SmallCloseIcon}
                size="2xs"
                color="white"
                bgColor="red.400"
                _hover={{ cursor: 'pointer' }}
                onClick={() => deleteOneNotification(item.timestamp)}
            />
        </MenuItem>
    ));
};

export default NotificationList;
