import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// Components
import MyButton from '../../util/MyButton'
import CreatePost from '../post/CreatePost'
import Notifications from './Notifications'
// Redux
import { connect } from 'react-redux'
//material ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
// Icons
import HomeIcon from '@material-ui/icons/Home'
import LoginIcon from '@material-ui/icons/PlayForWork'
import SignUpIcon from '@material-ui/icons/Router'
import ProfileIcon from '@material-ui/icons/AccountBoxTwoTone'

const style =  {
    navbar: {
        margin: 'auto 0 auto 10%'
    }
}

export class Navbar extends Component {
    render() {
        const { authenticated, classes, userHandle } = this.props
        return (
        <AppBar>
            <Toolbar className={classes.navbar}>
                {authenticated ? (
                <React.Fragment>
                    <CreatePost />
                    <Notifications />
                    <Link to={'/'}>
                        <MyButton tip="Home">
                            <HomeIcon color="secondary" />
                        </MyButton>
                    </Link>
                    <Link to={`/users/${userHandle}`}>
                        <MyButton tip="Profile">
                            <ProfileIcon color="secondary" />
                        </MyButton>
                    </Link>

                </React.Fragment>
                ) : (
                <React.Fragment>
                    <Button color='inherit' component={Link} to="/login">
                        <LoginIcon color="secondary" />
                        Login
                    </Button>
                    <Button color='inherit' component={Link} to="/signup">
                        <SignUpIcon color="secondary" />
                        SignUp
                    </Button>
                    <Button color='inherit' component={Link} to="/">
                        <HomeIcon color="secondary" />
                    </Button>
                </React.Fragment>      
                )}
            </Toolbar>
        </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    userHandle: PropTypes.string,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    userHandle: state.user.credentials.handle
})

export default connect(mapStateToProps)(withStyles(style)(Navbar))
