import { NavLink } from 'react-router-dom';

import { Item, List } from 'kantanui';

import EntityIcon from '@/shared/components/EntityIcon';

import { useListsContext } from '../../contexts';

export default function ListsNav() {
    const { lists } = useListsContext();

    return (
        <div>
            <List gap="s">
                {lists.map(list => (
                    <NavLink key={list.id} to={`/lists/${list.id}`}>
                        {({ isActive }) => (
                            <Item
                                key={list.id}
                                start={
                                    <EntityIcon icon={list.icon || 'folder'} />
                                }
                                content={list.name}
                                variant="plain"
                                shape="rounded-s"
                                active={isActive}
                                interactive
                            />
                        )}
                    </NavLink>
                ))}
            </List>
        </div>
    );
}