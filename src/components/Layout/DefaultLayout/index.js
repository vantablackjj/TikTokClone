import Header from '~/components/Layout/components/Header';
import Siderbar from './Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <Siderbar></Siderbar>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
