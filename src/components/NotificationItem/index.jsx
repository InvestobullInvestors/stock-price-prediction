import React from 'react'
import {Box, useColorModeValue, Flex, Spacer} from "@chakra-ui/react";
import {DeleteIcon} from '@chakra-ui/icons'


const NotificationItem = () => (
    <Box minH={10} bg={useColorModeValue("brand.100", "brand.700")} w="100%" p={4}>
        <Flex>
            <Box marginRight={8}>
                AMC stock jumped 50%
            </Box>
            <Spacer/>
            <Box>
                <DeleteIcon/>
            </Box>
        </Flex>
    </Box>
)

export default NotificationItem;
