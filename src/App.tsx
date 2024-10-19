import Contact from './components/contact/Contact';
import Footer from './components/Footer';
import NavBar from './components/header/NavBar';
import History from './components/history/History';
import Landing from './components/landing/Landing';
import CurrentSchedule from './components/schedules/CurrentSchedule';
import SingleTestimonial from './components/testimonials/SingleTestimonial';
import Videos from './components/videos/Videos';
import { colors } from './configs/colors';
import useGetFeatureFlags from './hooks/useGetFeatureFlags';
import ConditionalRender from './sharedComponents/ConditionalRender';

function App() {
    const featureFlags = useGetFeatureFlags();
    return (
        <div className={colors.bgMain}>
            <NavBar />
            <main>
                <Landing />

                {/* <Stats /> */}

                <Videos />

                <ConditionalRender
                    condition={featureFlags?.FEATURE_JAMMERS_2025_SCHEDULE || false}
                    isNullRender
                >
                    <CurrentSchedule />
                </ConditionalRender>

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
