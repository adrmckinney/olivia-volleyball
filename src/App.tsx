import Contact from './components/contact/Contact';
import Footer from './components/Footer';
import NavBar from './components/header/NavBar';
import History from './components/history/History';
import Landing from './components/landing/Landing';
import Vidoes from './components/vidoes/Vidoes';
import { colors } from './configs/colors';

function App() {
    return (
        <div className={colors.bgMain}>
            <NavBar />
            <main>
                <Landing />

                {/* <Stats /> */}

                <Vidoes />

                <History />

                {/* <About /> */}

                <Contact />

                {/* <CallToAction /> */}
            </main>

            <Footer />
        </div>
    );
}

export default App;
