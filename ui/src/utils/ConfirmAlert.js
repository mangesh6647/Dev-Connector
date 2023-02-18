import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function confirmDialog(msg) {
    return new Promise((resolve, reject) => {
        confirmAlert({
            title: 'Confirm to Delete.',
            message: msg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => resolve(true)
                },
                {
                    label: 'No',
                    onClick: () => resolve(false)
                }
            ],
            afterClose: () => reject
        });
    })
}

