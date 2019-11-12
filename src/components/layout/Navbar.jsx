import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import CreatePost from '../post/CreatePost'

// Redux
import { connect } from 'react-redux'

//material ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'


// Icons
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
        <AppBar>
            <Toolbar className='nav-container'>
                {authenticated ? (
                <React.Fragment>
                    <CreatePost />
                    <Link to ='/'>
                        <MyButton tip="Home">
                            <HomeIcon color="secondary" />
                        </MyButton>
                    </Link>                   
                    <MyButton tip="Notifications">
                        <NotificationsIcon color="secondary" />
                    </MyButton>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    <Button color='inherit' component={Link} to="/login">Login</Button>
                    <Button color='inherit' component={Link} to="/">Home</Button> 
                    <Button color='inherit' component={Link} to="/signup">SignUp</Button>
                </React.Fragment>      
                )}
            </Toolbar>
        </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
