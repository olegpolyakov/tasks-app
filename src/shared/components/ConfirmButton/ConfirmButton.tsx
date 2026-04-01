import { MouseEvent, useState } from 'react';

import { Button, ButtonGroup, ButtonProps, Dialog } from 'kantanui';

export default function ConfirmButton({
    onClick,
    onConfirm,
    onCancel,
    ...props
}: {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onConfirm: () => void;
    onCancel?: () => void;
} & ButtonProps) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDialogOpen(true);
        onClick?.(event);
    };

    const handleConfirm = () => {
        onConfirm();
        setDialogOpen(false);
    };

    const handleCancel = () => {
        onCancel?.();
        setDialogOpen(false);
    };

    return (
        <>
            <Button
                icon="delete"
                color="danger"
                onClick={handleClick}
                {...props}
            />

            <Dialog title="Are you sure?" open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <ButtonGroup variant="tinted" fluid>
                    <Button content="Yes" onClick={handleConfirm} />
                    <Button content="No" onClick={handleCancel} />
                </ButtonGroup>
            </Dialog>
        </>
    );
}