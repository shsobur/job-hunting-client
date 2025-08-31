import "./Banner.css";

const Banner = () => {
  return (
    <>
      <section id="main_banner_container">
        <div className="banner_bg_image_container">
          <div className="banner_overlay_container">

            <div className="banner_content">
              <h1>Find the job that fits you life</h1>
              <p>Join over 10 million people finding careers with us. Explore opportunities that match you skill adn aspirations.</p>

              <div className="jon_search_input_container">
                <form>
                  <input type="text" name="job" placeholder="🔍 Job title or keyword" />
                  <button>Search</button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Banner;