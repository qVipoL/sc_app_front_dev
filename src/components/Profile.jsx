import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { uploadImage, logOutUser } from '../redux/actions/userActions'

// Redux
import { connect } from 'react-redux'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import ExitToApp from '@material-ui/icons/ExitToApp'

const styles = (theme) => ({
    paper: {
      padding: 20
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
        width: 200,
        height: 200,
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
          color: theme.palette.primary.main
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
    }
  })

class Profile extends Component {
    constructor(props){
        super(props)

        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleEditPicture = this.handleEditPicture.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut(){
        this.props.logOutUser()
    }

    handleImageChange(event){
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }

    handleEditPicture(){
        const fileInput = document.getElementById("imageInput")
        fileInput.click()
    }

    render() {
        const { classes, user: {
            authenticated,
            credentials: { handle, createdAt, imageUrl, website, location, bio } }, 
            loading
        } = this.props
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile-pic" className="profile-image"/>
                        <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
                        <Tooltip title="Edit Profile Picture" placement="top-start">
                          <IconButton onClick={this.handleEditPicture} className={classes.buttons}>
                            <EditIcon color="primary"/>
                          </IconButton>
                        </Tooltip>
                    </div>
                    <Tooltip title="Log Out" placement="top-start">
                          <IconButton onClick={this.handleLogOut} className={classes.buttons}>
                              <ExitToApp color="primary"/>
                          </IconButton>
                    </Tooltip>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        { bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        { location && (
                            <React.Fragment>
                                <LocationOn color="primary" />
                                <span>{location}</span>
                                <hr/>
                            </React.Fragment>
                        )}
                        { website && (
                            <React.Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target='_blank' rel="noopener noreferrer">
                                    {' '}{ website }
                                </a>
                                <hr/>
                            </React.Fragment>
                        )}
                        <CalendarToday color="primary" />
                        {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    Please Log-In to View
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to={'/login'}>LogIn</Button>
                </div>
                <div className={classes.buttons}>
                    <Button variant="contained" color="secondary" component={Link} to={'/signup'}>SignUp</Button>
                </div>
            </Paper>
        )) : (<p>loading</p>)

        return profileMarkup
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { 
    uploadImage,
    logOutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
