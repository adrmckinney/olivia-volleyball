import Contact from './components/contact/Contact';
import Footer from './components/Footer';
import NavBar from './components/header/NavBar';
import History from './components/history/History';
import Landing from './components/landing/Landing';
import CurrentSchedule from './components/schedules/CurrentSchedule';
import SingleTestimonial from './components/testimonials/SingleTestimonial';
import Videos from './components/videos/Videos';
import { colors } from './configs/colors';

function App() {
    return (
        <div className={colors.bgMain}>
            <NavBar />
            <main>
                <Landing />

                {/* <Stats /> */}

                <Videos />

                <CurrentSchedule />

                <History />

                {/* <About /> */}

                <SingleTestimonial />

                <Contact />

                {/* <CallToAction /> */}
            </main>

            <Footer />
        </div>
    );
}

export default App;
