import React from 'react'
import Layout from './layouts/global.layout'
import DefaultPageLayout from "./layouts/reusables/DefaultPageLayout";

export default function MyApp({Component, pageProps}) {
    const PageLayout = Component.PageLayout ? Component.PageLayout : DefaultPageLayout

    return (
        <Layout>
            <PageLayout>
                <Component {...pageProps} />
            </PageLayout>
        </Layout>
    )
}