const SingleTestimonial = () => {
    return (
        <>
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-purple-600/10 ring-1 ring-purple-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <figure className="mt-10">
                        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                            <p>
                                “It was an honor coaching Olivia the ’23/’24 club season. Even
                                though it was my first season coaching her, she made tremendous
                                progress under my guidance as a 15 year old. What stood out was her
                                determination to become the best she can be. Her drive to become
                                better is remarkable. The reason I brought her back as a 16 year old
                                to a 17’s team is because of all the hard work she put in during the
                                off season. Her love for the sport is contagious. I know she will
                                excel in the game because she is very coachable and refuses to stop
                                pushing herself.”
                            </p>
                        </blockquote>
                        <figcaption className="mt-10">
                            {/* <img
                                alt=""
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="mx-auto h-10 w-10 rounded-full"
                            /> */}
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <div className="font-semibold text-gray-900">Coach Barnes</div>
                                <svg
                                    width={3}
                                    height={3}
                                    viewBox="0 0 2 2"
                                    aria-hidden="true"
                                    className="fill-gray-900"
                                >
                                    <circle r={1} cx={1} cy={1} />
                                </svg>
                                <div className="text-gray-600">
                                    Senior Director of Jammers and Head Coach of 15U Red Team
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>
        </>
    );
};

export default SingleTestimonial;
