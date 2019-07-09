import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';
import './PathButton.css';

const PathButton = React.memo(props => {
    const appContext = useContext(AppContext);
    const { text, path, fontSize } = props;
    const style = {
        fontSize: fontSize ? fontSize : '1em'
    }
    return (
        <div className='PathButton'>
            <p
                style={style}
                onClick={() => appContext.history.push(path)}
            >
                {text}
            </p>
        </div>
    );
});

PathButton.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    fontSize: PropTypes.string
};

export default PathButton;
