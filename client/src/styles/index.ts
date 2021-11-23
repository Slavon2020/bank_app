import { createTheme, Theme } from '@material-ui/core/styles';

import { globalStyles } from "./global";

    export const createMuiTheme = (): Theme => {
    return createTheme({
        overrides: {
            MuiCssBaseline: {
                "@global": globalStyles,
            },
            MuiButton: {
                root: {
                    padding: 24
                },
                sizeSmall: {
                    width: 15
                }
            }
        },
        palette: {
            type: 'light',
            primary: {
                main: '#f00',
            },
            secondary: {
                main: '#00f'
            }
        },
    });
};

export const theme = createTheme();