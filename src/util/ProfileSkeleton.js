import React from 'react'
import NoImg from '../images/blank-profile.png'
import PropTypes from 'prop-types'
// Mui
import Paper from '@material-ui/core/Paper' 

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
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
      ,
      handle: {
          height: 20,
          backgroundColor: '#8c8c8c',
          width: 60,
          margin: '0 auto 7px auto'
      },
      fullLine: {
          height: 25,
          backgroundColor: '#8c8c8c',
          width: '100%',
          marginBotton: 20
      },
      halfLine: {
        height: 15,
        backgroundColor: '#8c8c8c',
        width: '50%',
        marginBottom: 5,
        marginLeft: '25%'
    }
})


const ProfileSkeleton = (props) => {
    const { classes } = props
    return (
    <Paper className={classes.paper}>
        <div className={classes.profile}>
            <div className="image-wrapper">
                <img src={NoImg} alt="NoImg" className="profile-image"/>
            </div>
            <hr/>
            <div className="profile-details">
                <div className={classes.handle} />
                <hr/>
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <hr/>
                <div className={classes.halfLine} />
                <hr/>
                <div className={classes.halfLine} />
                <hr/>
                <div className={classes.halfLine} />
                <hr/>
                <div className={classes.fullLine} />
            </div>
        </div>
    </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)