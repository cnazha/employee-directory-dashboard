import React, {useCallback} from 'react';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Box from "@mui/material/Box";
import {useFirebaseAuthContext} from "@/context/useFirebaseAuth.context";
import {useRouter} from "next/navigation";


const DRAWER_WIDTH = 240;

const LINKS = [{text: 'Employees', href: '/dashboard/employees', icon: ChecklistIcon}, {text: 'Departments', href: '/dashboard/departments', icon: ChecklistIcon},];


const DashboardLayout = ({children}: {
    children: React.ReactNode;
}) => {
    const {logout} = useFirebaseAuthContext()
    const router = useRouter();
    const handleLogout = useCallback(async () => {
        await logout();
        router.push('/');
    }, [logout, router]);
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1, bgcolor: 'background.default', ml: `${DRAWER_WIDTH}px`, p: 3,
            }}
        >
            <Drawer
                sx={{
                    width: DRAWER_WIDTH, flexShrink: 0, '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH, boxSizing: 'border-box', height: 'auto', bottom: 0,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Divider/>
                <List>
                    {LINKS.map(({text, href, icon: Icon}) => (<ListItem key={href} disablePadding>
                        <ListItemButton component={Link} href={href}>
                            <ListItemIcon>
                                <Icon/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>))}

                    <Divider/>
                    <ListItemButton
                        onClick={handleLogout}
                    >
                        <ListItemText primary={'Logout'}/>
                    </ListItemButton>
                </List>



            </Drawer>
            {children}

        </Box>
    );
};

export default DashboardLayout;
