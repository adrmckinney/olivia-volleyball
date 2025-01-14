import { Testimonials } from '../../assets/testimonialContent';
import SingleTestimonialContainer from '../../sharedComponents/Containers/SingleTestimonialContainer';
import WhiteWithPurpleHue from '../../sharedComponents/Containers/WhiteWithPurpleHue';

const BarnesTestimonial = () => {
    return (
        <>
            <WhiteWithPurpleHue>
                <SingleTestimonialContainer
                    testimonial={Testimonials.barnes.testimonial}
                    name={Testimonials.barnes.name}
                    position={Testimonials.barnes.position}
                />
            </WhiteWithPurpleHue>
        </>
    );
};

export default BarnesTestimonial;
