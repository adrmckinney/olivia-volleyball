type Props = {
    testimonial: string;
    name: string;
    position: string;
};
const SingleTestimonialContainer = ({ testimonial, name, position }: Props) => {
    return (
        <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                <p>{testimonial}</p>
            </blockquote>
            <figcaption className="mt-10">
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900">{name}</div>
                    <svg
                        width={3}
                        height={3}
                        viewBox="0 0 2 2"
                        aria-hidden="true"
                        className="fill-gray-900"
                    >
                        <circle r={1} cx={1} cy={1} />
                    </svg>
                    <div className="text-gray-600">{position}</div>
                </div>
            </figcaption>
        </figure>
    );
};

export default SingleTestimonialContainer;
