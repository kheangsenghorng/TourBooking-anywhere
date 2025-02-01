
import "font-awesome/css/font-awesome.min.css"; // Ensure Font Awesome is imported

const CardTour = () => {
  return (
    <section>
      <div
        className="container mx-auto my-5 px-4 max-w-screen-xl"
        data-bs-spy="scroll"
        data-bs-target="#list-example"
        data-bs-smooth-scroll="true"
        tabIndex="0"
      >
        {/* Heading */}
        <h4 className="mb-4 border rounded text-2xl p-3" id="tour-tab">
          Best Selections
        </h4>

        {/* Row for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          {/* Card 1 */}
          <div className="card border rounded-lg shadow-sm relative">
            <a href="">
              <img
                src="./image/Hotel in kompot/2.jpg"
                className="w-full h-56 object-cover rounded-t-lg"
                alt="Travel Image"
              />
              <button className="btn btn-light bg-white rounded-md btn-sm text-dark absolute top-0 right-0 p-2 m-3">
                <i className="fa-regular fa-heart"></i>
              </button>
            </a>
            <div className="p-4">
              <p className="mt-2 mb-0">
                Seam Rep <span className="mx-2">↔</span> Kampot
              </p>
              <h5 className="font-bold text-xl mb-0">$350</h5>
              <p className="text-muted mb-2 text-sm">
                Period: 2 nights and 3 days
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card border rounded-lg shadow-sm relative">
            <a href="">
              <img
                src="./image/Hotel in kompot/1.jpg"
                className="w-full h-56 object-cover rounded-t-lg"
                alt="Travel Image"
              />
              <button className="btn btn-light btn-sm bg-white rounded-md text-dark absolute top-0 right-0 p-2 m-3">
                <i className="fa-regular fa-heart"></i>
              </button>
            </a>
            <div className="p-4">
              <p className="mt-2 mb-0">
                Seam Rep <span className="mx-2">↔</span> Kampot
              </p>
              <h5 className="font-bold text-xl mb-0">$350</h5>
              <p className="text-muted mb-2 text-sm">
                Period: 2 nights and 3 days
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card border rounded-lg shadow-sm relative">
            <a href="">
              <img
                src="../image/Hotel in kompot/4.jpg"
                className="w-full h-56 object-cover rounded-t-lg"
                alt="Travel Image"
              />
              <button className="btn btn-light btn-sm bg-white rounded-md text-dark absolute top-0 right-0 p-2 m-3">
                <i className="fa-regular fa-heart"></i>
              </button>
            </a>
            <div className="p-4">
              <p className="mt-2 mb-0">
                Seam Rep <span className="mx-2">↔</span> Kampot
              </p>
              <h5 className="font-bold text-xl mb-0">$350</h5>
              <p className="text-muted mb-2 text-sm">
                Period: 2 nights and 3 days
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card border rounded-lg shadow-sm relative">
            <a href="">
              <img
                src="../image/Hotel in kompot/3.jpg"
                className="w-full h-56 object-cover rounded-t-lg"
                alt="Travel Image"
              />
              <button className="btn btn-light btn-sm bg-white rounded-md text-dark absolute top-0 right-0 p-2 m-3">
                <i className="fa-regular fa-heart"></i>
              </button>
            </a>
            <div className="p-4">
              <p className="mt-2 mb-0">
                Seam Rep <span className="mx-2">↔</span> Kampot
              </p>
              <h5 className="font-bold text-xl mb-0">$350</h5>
              <p className="text-muted mb-2 text-sm">
                Period: 2 nights and 3 days
              </p>
            </div>
          </div>
        </div>

        {/* View All Packages Button */}
        <div className="mt-4 flex justify-end">
          <button className="px-9 py-2 rounded-full border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition">
            View All Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardTour;
