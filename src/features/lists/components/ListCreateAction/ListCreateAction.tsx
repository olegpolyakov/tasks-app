import { Button, type ButtonProps } from 'kantanui';

import { useListsContext } from '../../contexts/ListsContext';

export default function ListCreateAction(props: ButtonProps) {
    const { openCreateListDialog } = useListsContext();

    return (
        <Button
            title="Create a list"
            onClick={openCreateListDialog}
            {...props}
        />
    );
}