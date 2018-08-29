import { createMuiTheme } from 'material-ui/styles';

const colors = {
    // primary pallete
    primary: {
        main: '#3F51B5',
        mainBlue: '#3F51B5',
        secondaryBlue: '#2196F3',
        actionGreen: '#00E676',
        black: '#000000',
        darkGrey: '#595959',
        mediumGrey: '#919191',
        lightGrey: '#D8D8D8',
        backgroundGrey: '#F2F2F2',
        white: '#ffffff',
        successGreen: '#00C853',
        errorRed: '#D32F2F',
    },
    // secondary pallete
    secondary: {
        main: '#2196F3',
        pink: '#E91E63',
        lightPurple: '#9C27B0',
        darkPurple: '#673AB7',
        lightBlue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        darkGreen: '#4CAF50',
        lightGreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#FFC107',
        lightOrange: '#FF9800',
        darkOrange: '#FF5722',
        brown: '#795548',
        darkAmber: '#ff8503'
    },
    // old ones to delete
    background: '#2196F3',
    login: {
        link: '#2196F3'
    }
};

const theme = {
    colors: colors,
    palette: {
        primary: {
            main: colors.primary.mainBlue,
        },
        secondary: {
            main: colors.primary.secondaryBlue,
        },
    },
    layoutSizes: {
        drawerWidth: 267,
        contentMaxWidth: 1200,
    },
    tooltip: {
        target: {
            borderBottom: `1px dotted ${colors.primary.lightGrey}`,
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
            maxWidth: 300,
            marginBottom: 4,
        },
        text: {
            fontSize: 14,
            fontWeight: 'normal',
            color: 'white',
            maxWidth: 300,
            textAlign: 'justify',
        },
    },
    typography: {
        mainFont: 'Roboto',
        headline: {
            fontWeight: 'normal',
            fontSize: '24px',
            color: colors.primary.black,
        },
        subtitle: {
            fontWeight: 'normal',
            fontSize: '16px',
            color: colors.primary.black,
        },
        sectionHeaders: {
            textTransform: 'uppercase',
            fontWeight: 'normal',
            fontSize: '12px',
            color: colors.primary.mediumGrey,
        },
        primaryBody: {
            fontWeight: 'normal',
            fontSize: '16px',
            color: colors.primary.darkGrey
        },
        secondaryBody: {
            fontWeight: 'normal',
            fontSize: '16px',
            color: colors.primary.mediumGrey
        },
        primarySmallBody: {
            fontWeight: 'normal',
            fontSize: '14px',
            color: colors.primary.darkGrey
        },
        secondarySmallBody: {
            fontWeight: 'normal',
            fontSize: '14px',
            color: colors.primary.mediumGrey
        },
        caption: {
            fontWeight: 'normal',
            fontSize: '12px',
            color: colors.primary.mediumGrey
        },
        errorMessage: {
            fontWeight: 'normal',
            fontSize: '12px',
            color: colors.primary.errorRed
        }
    },
    buttons: {
        default: {
            fontSize: '14px',
            fontWeight: '500',
        },
        primary: {
            color: colors.primary.mediumGrey,
            background: colors.primary.white
        },
        action: {
            color: colors.primary.white,
            height: '38px',
            background: colors.primary.actionGreen,
            borderWidth:  '0',
            outline: 'none',
            boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
        },
        actionHover: {
            background: colors.primary.actionGreen,
            opacity: '0.85'
        },
        actionDisabled: {
            height: '38.3px',
            opacity: '0.45',
            backgroundColor: '#00E676',
            borderWidth:  '0',
            outline: 'none',
            boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
        },
        actionPressed: {
            background: colors.primary.successGreen,
        },
        primaryTextLink: {
            textTransform: 'uppercase',
            color: colors.primary.secondaryBlue,
            fontSize: '14px'
        },
        secondaryTextLink: {
            textTransform: 'uppercase',
            color: colors.primary.darkGrey,
            fontSize: '14px'
        },
        thirdTextLink: {
            color: colors.primary.secondaryBlue,
            fontSize: '14px',
            textDecoration: 'none',
            textTransform: 'none',
        }
    },
    overrides: {
        MuiChip: {
            root: {
                color: colors.primary.mediumGrey,
                height: '32px',
                backgrounColor: colors.primary.backgroundGrey,
            },
            deleteIcon:{
                color: colors.primary.darkGrey,
            }
        },
        MuiMenu: {
            paper: {
                marginTop: '-12px',
            }
        },
        MuiStepper: {
            root: {
                border: 'none'
            }
        },
        MuiInput: {
            disabled: {
                borderBottom: '1px solid grey',
            }
        },
        MuiStepContent: {
            root: {
                paddingBottom: '3px',
            },
        },
        MuiSelect: {
            select: {
                '&:focus': {
                    backgroundColor: 'transparent',
                }
            },
        },
        MuiButton:{
            disabled:{
                '&:disabled':{
                    color: 'white'
                }
            }
        },
        MuiList: {
            padding: {
                paddingTop: 0,
                paddingBottom: 0,
            },
        },
        MuiStepper: {
            root: {
                paddingRight: '3',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: 'normal',
                fontSize: '16px',
                color: colors.primary.darkGrey,
            },
            secondary: {
                fontWeight: 'normal',
                fontSize: '14px',
                color: colors.primary.mediumGrey,
            },
        },
        MuiFormControlLabel: {
            label: {
                fontWeight: 'normal',
                fontSize: '16px',
                color: colors.primary.darkGrey
            },
        },
        MuiAvatar: {
            colorDefault: {
                backgroundColor: colors.primary.secondaryBlue,
            }
        },
        MuiExpansionPanelSummary:{
            content: {
                '&$content': {
                    margin: 0,
                    marginTop: 1
                },
            },
        }
    }
};

export default createMuiTheme(theme);