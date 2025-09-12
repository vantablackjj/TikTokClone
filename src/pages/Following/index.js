import React from 'react';
import ViewVideo from 'src/components/ViewVideo';

function Following() {
    const CATEGORIES = 'following';
    return (
        <div>
            <ViewVideo type={CATEGORIES} />
        </div>
    );
}

export default Following;
