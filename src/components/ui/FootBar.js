import { Grid, Link, Typography } from '@material-ui/core'
import React from 'react'

export const FootBar = ({classes}) => {
    return (
        <footer className={classes.footer}>
        <Grid container >
            <Grid item xs={10}>

            
            </Grid>
            <Grid item xs={2} variant="body2" color="textSecondary">
                <Typography variant="body2" color="textSecondary">
                {'Copyright © '}
                    <Link color="inherit" href="https://hruiz.com/">
                        hruiz
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.    '}
                    {'  V 0.0.5 '}
                </Typography>
                
            </Grid>
        
        </Grid>
      </footer>
        
    )
}

