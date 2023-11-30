// import carousel3 from "../images/hospital_slider.png";
import 'bootstrap/dist/css/bootstrap.min.css';

          const Carousel = () => {
            return (
              <div>
              <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-intervel="5000">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={require('./BestSerg.jpg')} class="d-block w-100" alt="..." height="500px"></img>
              </div>
              <div class="carousel-item">
                <img src={require('./delmont.png')} class="d-block w-100" alt="..." height="500px"></img>
              </div>
              <div class="carousel-item">
                <img src={require('./child.jpg')} class="d-block w-100" alt="..." height="500px"></img>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          </div>
            );
          };
export default Carousel;
