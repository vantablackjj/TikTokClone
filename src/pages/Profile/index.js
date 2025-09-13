import React from 'react';
import ViewProfile from 'src/components/ViewProfile';

function ProfilePage() {
    const CATEGORIES = 'profile';

    return (
        <div>
            <ViewProfile type={CATEGORIES} />
        </div>
    );
}

export default ProfilePage;
