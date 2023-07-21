import {Drawer, Divider, Button} from "antd";
import {useState} from "react";
import styles from './_index.styles.module.scss'
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import {useFetchUser} from "../client/react-query/user.api";
import DefaultPageLayout from "./layouts/reusables/DefaultPageLayout";

import React from 'react'

export const Home = () => {
    const [open, setOpen] = useState(false);

    const onCloseDrawer = () => {
        setOpen(false);
    };
    const onOpenDrawer = () => {
        setOpen(true);
    };

    const {data: user} = useFetchUser()
    console.log('user', user)

    return (<>
            <Head>
                <title>Home</title>
            </Head>
            <div className={styles.drawerWrapper}>
                Render in this
                <div style={{marginTop: 16}}>
                    <Button type="primary" onClick={onOpenDrawer}>Open</Button>
                </div>
                <Drawer
                    className={styles.drawer}
                    title={<><span className={'user'}><FontAwesomeIcon
                        icon={faUser}
                    />{user?.username}</span></>}
                    placement="right"
                    closable={true}
                    onClose={onCloseDrawer}
                    open={open}
                    getContainer={false}
                >
                    <Divider />

                    <ul>
                        <li>
                            <span>Sign out</span>
                        </li>
                    </ul>
                </Drawer>
            </div>
        </>
    )
}

export default Home
