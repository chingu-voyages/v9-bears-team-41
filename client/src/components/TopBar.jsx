import React from 'react';
import PropTypes from 'prop-types';
import PathButton from './PathButton';
import './TopBar.css';
import { Grid } from 'semantic-ui-react'

const TopBar = React.memo(props => {
    return (
        <div className='topBar'>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column
                        textAlign='center'
                        verticalAlign='middle'
                    >
                        <PathButton text='Entry List Page' path='/' fontSize='2em'/>
                    </Grid.Column>
                    <Grid.Column
                        textAlign='center'
                        verticalAlign='middle'
                    >
                        <PathButton text='Upload Page' path='/upload' fontSize='2em'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
});

TopBar.propTypes = {
};

export default TopBar;
