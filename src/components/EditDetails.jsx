import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { editUserDetails } from '../redux/actions/userActions'
import themeObj from '../util/theme'
// Redux
import { connect } from 'react-redux'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MyButton from '../util/MyButton'
// Icons
import EditIcon from '@material-ui/icons/Edit'


const styles = () => ({...themeObj})

export class EditDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            bio: '',
            website: '',
            location: '',
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
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
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
            location: this.state.location
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
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidthmaxWidth="sm">
                    <DialogTitle>Edit Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A Bio About You"
                            className={classes.textField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth />
                            <TextField
                            name="website"
                            type="text"
                            label="WebSite"
                            placeholder="A Link To You Website"
                            className={classes.textField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            fullWidth />
                            <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Your Location"
                            className={classes.textField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
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
