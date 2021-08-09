import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { DeleteIcon, Icon } from '@chakra-ui/icons';
import { useUser } from '../../contexts/useUser';

const NotificationList = () => {
    const { notifications, deleteOneNotification } = useUser();

    if (notifications == null || notifications.length < 1)
        return <Text m={3}>No new notifications!</Text>;

    return notifications.map((item, id) => (
        <HStack key={id} px={4} py={2}>
            <Text mx={1}>{item.text}</Text>
            <Icon
                as={DeleteIcon}
                boxSize={5}
                _hover={{ cursor: 'pointer', color: 'brand.500' }}
                onClick={() => deleteOneNotification(item.timestamp)}
            />
        </HStack>
    ));
};

export default NotificationList;
