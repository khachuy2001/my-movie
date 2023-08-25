import React from 'react';

import './input.scss';

const input = props => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            //Nếu props.onChange không tồn tại (undefined), sự kiện onChange sẽ được thiết lập là null.
            onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
    );
}

export default input;