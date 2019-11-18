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
import Button from '@material-ui/core/Button'
//Icons
import NotificationsIcon from '@material-ui/icons/AddAlert'
import FavoriteIcon from '@material-ui/icons/ThumbUpAltRounded'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'
import { markNotificationsRead, deleteNotifications } from '../../redux/actions/userActions'

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

    onDeleteNotifications = () => {
        let notificationIds = this.props.notifications.map(notification => notification.notificationId)
        this.props.deleteNotifications(notificationIds)
    }

    render(){
        const notifications = this.props.notifications
        const anchorEl = this.state.anchorEl

        dayjs.extend(relativeTime)

        let notificationsIcon
        if(notifications && notifications.length > 0){
            notifications.filter(notification => notification.read === false).length > 0
            ? notificationsIcon = (
                <Badge badgeContent={notifications.filter(notification => notification.read === false).length} color="secondary">
                    <NotificationsIcon/>
                </Badge>
            ) : (
                notificationsIcon = <NotificationsIcon color="secondary"/>
            )
        } else {
            notificationsIcon = <NotificationsIcon color="secondary"/>
        }

        let notificationsMarkup = (notifications && notifications.length > 0) ? (
            notifications.map(notification => {
                const verb = notification.type === 'like' ? 'liked' : 'commented on'
                const time = dayjs(notification.createdAt).fromNow()
                const iconColor = notification.read ? "primary" : "primary"
                const icon = notification.type === 'like' ? (<FavoriteIcon color={iconColor} style={{ marginRight: 10}} />) : (<ChatIcon color={iconColor} style={{ marginRight: 10}} />)

                return ( 
                    <MenuItem key={notification.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            variant="body1"
                            to={`/users/${notification.recipient}/post/${notification.postId}`}
                        >
                            {notification.sender} {verb} your post {time}
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
                <Button style={{backgroundColor:'#ef9a9a', width:'100%'}} disabled={notifications.length < 1} onClick={this.onDeleteNotifications}>
                    Clear Notifications
                </Button>
            </Menu>
        </React.Fragment>)
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    deleteNotifications: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationsRead,
    deleteNotifications
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications)
