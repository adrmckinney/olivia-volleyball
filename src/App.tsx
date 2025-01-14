import About from './components/about/About';
import Contact from './components/contact/Contact';
import Footer from './components/Footer';
import NavBar from './components/header/NavBar';
import History from './components/history/History';
import Landing from './components/landing/Landing';
import SchedulesSection from './components/schedules/SchedulesSection';
import BarnesTestimonial from './components/testimonials/BarnesTestimonial';
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

                <ConditionalRender condition={featureFlags.FEATURE_ABOUT_SECTION} isNullRender>
                    <About />
                </ConditionalRender>

                <Videos />

                <ConditionalRender condition={featureFlags.SCHEDULES_AND_STATS} isNullRender>
                    <SchedulesSection />
                </ConditionalRender>

                <History />

                <BarnesTestimonial />

                <Contact />

                {/* <CallToAction /> */}
            </main>

            <Footer />
        </div>
    );
}

export default App;
