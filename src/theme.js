import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple, blue } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: blue[600],
        },
        secondary: {
            main: deepPurple[500],
        },
    },
    typography: {
        // Use the system font.
        fontSize: 12,
        fontFamily: 'Balsamiq Sans',
      },
})

export default theme;