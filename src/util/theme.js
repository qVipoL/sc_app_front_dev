export default {
  palette: {
    primary: {
      main: '#424242'
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
  spreadIt: {
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    formIcon: {
        maxWidth: '25%',
        opacity: 0.3,
        marginTop: '10px' 
      },
    textField: {
        marginBottom: '20px'
    },
    button: {
        marginTop: '20px',
        position: 'relative'
    },
    pageTitle: {
        marginBottom: '5px'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
    signUpLink: {
        color: '#ff5722'
    },
    simpleBg: {
      backgroundColor: '#e0e0e0', 
      height:'100%',
      boxShadow: '1px 1px 3px #424242'
    },
    avatar: {
      margin: 'auto'
    },
    visibleSep: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    },
    paper: {
      padding: 10,
      backgroundColor: '#BAB9B9',
      boxShadow: '1px 1px 3px #424242'
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 150,
        height: 150,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#424242'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    },
    buttomBtns: {
      display:'flex',
      justifyContent:'space-between'
    }
  }
} 