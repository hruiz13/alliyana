import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-roboto';

import { theme } from './styles/theme';
import { AppRouter } from './routers/AppRouter'

export const Alliyana = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        </ThemeProvider>
    )
}
