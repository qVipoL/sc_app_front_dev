import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
// Components
import MyButton from '../../util/MyButton'
import EditDetails from './EditDetails'
import ProfileSkeleton from '../../util/ProfileSkeleton'
// Redux
import { connect } from 'react-redux'
import { uploadImage, logOutUser } from '../../redux/actions/userActions'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
// Icons
import AccountIcon from '@material-ui/icons/AccountCircle'
import LinkIcon from '@material-ui/icons/Link'
import CalendarIcon from '@material-ui/icons/EventAvailable'
import EditPhotoIcon from '@material-ui/icons/InsertPhoto'
import ExitToApp from '@material-ui/icons/ExitToApp'

const styles = (theme) => ({
    paper: {
      padding: 10,
      backgroundColor: '#9e9e9e',
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
    },
    button: {
      marginTop: '20px',
      position: 'relative'
    },
    buttomBtns: {
      display:'flex',
      justifyContent:'space-between'
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
            credentials: { handle, createdAt, imageUrl, website, bio } }, 
            loading
        } = this.props
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile-pic" className="profile-image"/>
                        <input type="file" id="imageInput" name="image" onChange={this.handleImageChange} hidden="hidden"/>
                        <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName={classes.buttons}>
                          <EditPhotoIcon color="primary"/>
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                          <AccountIcon color="primary" />
                          {handle}
                        </MuiLink>
                        <hr/>
                        { bio && <Typography variant="body2">{bio}</Typography> }
                        <hr/>
                        { website && (
                          <React.Fragment>
                              <LinkIcon color="primary" />
                              <a href={website} target='_blank' rel="noopener noreferrer">
                                  {' '}{ website }
                              </a>
                              <hr/>
                          </React.Fragment>
                        )}
                        <CalendarIcon color="primary" />
                        {' '}
                        <span>Joined On {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <div className={classes.buttomBtns}>
                      <MyButton tip="Log Out" onClick={this.handleLogOut} btnClassName={classes.button}>
                          <ExitToApp color="primary"/>
                      </MyButton>
                      <EditDetails />
                    </div>
                </div>
            </Paper>
        ) : (
            <React.Fragment>
            </React.Fragment>
        )) : (<ProfileSkeleton />)

        return profileMarkup
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logOutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { 
    uploadImage,
    logOutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
