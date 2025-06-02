import ViewVideo from 'src/components/ViewVideo';

function Home() {
    const CATEGORIES = 'for-you';
    return (
        <div>
            <ViewVideo type={CATEGORIES} />
        </div>
    );
}

export default Home;
