import React from 'react'
// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

export const HomeMediaQuery = (props) => {
    const matchesQuery = useMediaQuery('(min-width:800px)');
    const homePageMarkup = matchesQuery && props.authenticated ? (
        <Grid container spacing={8} className={props.classes.simpleBg}>
            <Grid item sm={4}>
                {props.profileMarkUp}
            </Grid>
            <Grid item sm={8}>
                {props.postsMarkUp}
            </Grid>
        </Grid>
    ) : (
        <Grid item xs={12} className={props.classes.simpleBg}>
            {props.postsMarkUp}
        </Grid>
    )
    return homePageMarkup;
}
