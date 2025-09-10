import "./ContactModal.css";

const ContactModal = () => {
  return (
    <>
      <section>
        <dialog id="contact_update_modal" className="modal">
          <div className="modal-box min-w-[1024px]">
            <form method="dialog" className="mb-5">
              <button className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2">
                <span className="text-2xl font-semibold text-gray-700">x</span>
              </button>
            </form>

            <div className="contact_update_main_content_container">
              <h1 className="modal_title">Let's update you contacts</h1>
            </div>

          </div>
        </dialog>
      </section>
    </>
  );
};

export default ContactModal;