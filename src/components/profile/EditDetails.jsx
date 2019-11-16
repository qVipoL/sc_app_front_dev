import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MyButton from '../../util/MyButton'
// Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({...theme.spreadIt})

class EditDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            bio: '',
            website: '',
            open: false
        }     
    }

    componentDidMount(){
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleOpen = () => {
        this.setState({open: true})
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({open: false})
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : ''
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: ''
        }
        this.props.editUserDetails(userDetails)
        this.setState({open: false})
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle><strong>Edit Details</strong></DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="Some Info About You"
                            className={classes.textField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth />
                            <TextField
                            name="website"
                            type="text"
                            label="WebSite"
                            placeholder="Some Website Link"
                            className={classes.textField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Change
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

EditDetails.prototypes = {
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
