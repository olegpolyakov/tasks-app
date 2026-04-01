import { NavLink } from 'react-router-dom';

import { Item, List } from 'kantanui';

export default function TasksNav() {
    return (
        <List as="nav" gap="s">
            <NavLink to="/today">
                {({ isActive }) => (
                    <Item
                        icon="today"
                        content="Today"
                        variant="plain"
                        shape="rounded-s"
                        active={isActive}
                        interactive
                    />
                )}
            </NavLink>
                
            <NavLink to="/inbox">
                {({ isActive }) => (
                    <Item
                        icon="inbox"
                        content="Inbox"
                        variant="plain"
                        shape="rounded-s"
                        active={isActive}
                        interactive
                    />
                )}
            </NavLink>

            <NavLink to="/all">
                {({ isActive }) => (
                    <Item
                        icon="done_all"
                        content="All"
                        shape="rounded-s"
                        variant="plain"
                        active={isActive}
                        interactive
                    />
                )}
            </NavLink>
        </List>
    );
}