import React from 'react';

function CustomHTML({html, className, ...rest}) {
    const sanitize = (html) => ({ __html: html });

    return (
        <div {...rest} className={className} dangerouslySetInnerHTML={sanitize(html)} />
    );
}

export default CustomHTML;