import React from 'react'
import NoImg from '../images/blank-profile.png'
import PropTypes from 'prop-types'
// Mui
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent' 

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    card: {
        display: 'flex',
        marginBottom: 20,
        boxShadow: '1px 1px 3px #424242',
        backgroundColor: '#9e9e9e'
    },
    contentCard:{
        padding: 10,
        width: '100%',
        flexDirection: 'column'
    },
    image: {
        minWidth: '165px',
        objectFit: 'cover',
    },
    handle: {
        width: 70,
        height: 20,
        backgroundColor: '#8c8c8c',
        marginBottom: 7,
        marginTop: 5
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: '#8c8c8c',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: '#8c8c8c'
    },
    halfLine: {
        height: 18,
        width: '50%',
        marginBottom: 15,
        backgroundColor: '#8c8c8c'
    }
})

const PostSkeleton = (props) => {
    const { classes } = props

    const postMarkup = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.image} image={NoImg} />
            <CardContent className={classes.contentCard}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>
            </CardContent>
        </Card>
    ))

    return <React.Fragment>{postMarkup}</React.Fragment>
}

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostSkeleton)