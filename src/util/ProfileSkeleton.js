import React from 'react'
import NoImg from '../images/blank-profile.png'
import PropTypes from 'prop-types'
// Mui
import Paper from '@material-ui/core/Paper' 

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
      ...theme.spreadIt,
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