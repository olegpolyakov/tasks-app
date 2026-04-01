import { Button } from 'kantanui';

import { useProjectContext } from '../../contexts';

export default function ProjectEditAction() {
    const { openProjectDialog } = useProjectContext();

    return (
        <Button
            content="Edit project"
            onClick={openProjectDialog}
        />
    );
}