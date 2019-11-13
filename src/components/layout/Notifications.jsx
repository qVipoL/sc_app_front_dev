import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import relativeTime from 'dayjs/plugin/relativeTime'

//MUI
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

//Redux
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions'

class Notifications extends Component{
    state = {
        anchorEl: null
    }

    handleOpen = (e) => {
        this.setState({ anchorEl: e.target })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    onMenuOpened = () => {
        let unReadNotficationsIds = this.props.notifications
            .filter(notification => !notification.read)
            .map(notification => notification.notificationId)

        this.props.markNotificationsRead(unReadNotficationsIds)
    }

    render(){
        const notifications = this.props.notifications
        const anchorEl = this.state.anchorEl

        dayjs.extend(relativeTime)

        let notificationsIcon
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
            ? notificationsIcon = (
                <Badge badgeContent={notifications.filter(not => not.read === false).length} color="secondary">
                    <NotificationsIcon color="primary"/>
                </Badge>
            ) : (
                notificationsIcon = <NotificationsIcon color="secondary"/>
            )
        } else {
            notificationsIcon = <NotificationsIcon color="secondary"/>
        }

        let notificationsMarkup = (notifications && notifications.length > 0) ? (
            notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commented on'
                const time = dayjs(not.createdAt).fromNow()
                const iconColor = not.read ? "primary" : "secondary"
                const icon = not.type === 'like' ? (<FavoriteIcon color={iconColor} style={{ marginRight: 10}} />) : (<ChatIcon color={iconColor} style={{ marginRight: 10}} />)

                return ( 
                    <MenuItem key={not.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            variant="body1"
                            to={`/users/${not.recipient}/post/${not.postId}`}
                        >
                            {not.sender} {verb} your post {time}
                        </Typography>
                    </MenuItem>
                )
            })

        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications
            </MenuItem>
        )

        return(
        <React.Fragment>
            <Tooltip placement="top" title="notifications">
                <IconButton 
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
            </Tooltip>
            <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEntered={this.onMenuOpened}>
                {notificationsMarkup}
            </Menu>
        </React.Fragment>)
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications)
