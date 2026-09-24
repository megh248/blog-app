export const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-7xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Thoughts worth sharing
        </h1>
        <div className="px-4 mx-auto text-center md:max-w-3xl lg:max-w-5xl lg:px-36">
          <span className="font-semibold text-gray-400 uppercase">
            {" "}
            Articles about development, technology and things I'm learning.
          </span>
        </div>
      </div>
    </section>
  );
};
