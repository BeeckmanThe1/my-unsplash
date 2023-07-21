import React from 'react'

/*
* Contains the layout.skeleton we need form (most) pages. This contains:
* - Navigation
* {content}
* footer
*
* The idea is that this is configurable using the compound component approach,
* so that custom pages can still use this template and add their own custom stuff:
*
* EG: PageWithCustomLayout.PageLayout = CustomPageLayout
* */
export const DefaultPageLayout = ({ children }) => {
    return <>
        <h1>Default page layout</h1>
        <main>{children}</main>
    </>
}

export default DefaultPageLayout
