import React from 'react';
import {Link} from 'react-router-dom';
import {useLocale} from './UseLocales';

const LocalizedLink = ({to, children, ...props}) => {
    const {prefix} = useLocale();

    const localizedTo = to.startsWith('/') ? `${prefix}${to}` : to;

    return (
        <Link to={localizedTo} {...props}>
            {children}
        </Link>
    );
};

export default LocalizedLink;