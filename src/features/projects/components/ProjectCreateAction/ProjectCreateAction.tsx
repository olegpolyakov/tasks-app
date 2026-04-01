import { Button, type ButtonProps } from 'kantanui';

import { useProjectsContext } from '../../contexts/ProjectsContext';

export default function ProjectCreateAction(props: ButtonProps) {
    const { openCreateProjectDialog } = useProjectsContext();

    return (
        <Button
            title="Create project"
            onClick={openCreateProjectDialog}
            {...props}
        />
    );
}