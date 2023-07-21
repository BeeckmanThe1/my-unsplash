// app/layout.js
import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

config.autoAddCss = false;

const queryClient = new QueryClient()

export const RootLayout = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default RootLayout