import "./BannerModal.css";

const BannerModal = () => {
  return (
    <>
      <section>
        <dialog id="banner_update_modal" className="modal">
          <div className="modal-box min-w-[1024px]">
            <form method="dialog" className="mb-5">
              <button className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2">
                <span className="text-2xl font-semibold text-gray-700">x</span>
              </button>
            </form>

            <div className="contact_update_main_content_container">
              <h1 className="modal_title font-semibold font-[Montserrat] text-[1.5rem]">
                Let's update you banner
              </h1>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default BannerModal;