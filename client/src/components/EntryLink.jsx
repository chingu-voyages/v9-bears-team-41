import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';
import './EntryLink.css';

const EntryLink = React.memo(props => {
    const appContext = useContext(AppContext);
    const entryName = props.entryName;
    const url = `entry?${entryName}`
    return (
        <div className='entryLink'>
            <p onClick={() => appContext.history.push(url)}>
                {entryName}
            </p>
        </div>
    );
});

EntryLink.propTypes = {
    entryName: PropTypes.string.isRequired
};

export default EntryLink;
