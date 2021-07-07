import {AlertDialog, AlertDialogContent, AlertDialogOverlay} from "@chakra-ui/react";
import React from "react";

const AlertDialogBox = ({isOpen, onClose, children}) => (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
            <AlertDialogContent>
                {children}
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
)

export default AlertDialogBox;
