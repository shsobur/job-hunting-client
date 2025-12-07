import { MdDescription, MdFlag, MdVisibility } from "react-icons/md";
import SeekerModalHeader from "../../Shared/SeekerModalHeader/SeekerModalHeader";

const DigitalResume = () => {
  return (
    <>
      <div>
        <dialog id="rec_digital_Resume" className="modal">
          <div className="modal-box max-w-[1024px] max-h-[95vh] flex flex-col p-0">
            {/* Header */}
            <SeekerModalHeader title="Update About Information" />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-4 space-y-6">
                {/* About Us Section */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                    About Your Company
                  </h3>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-gray-700 text-lg">
                      <MdDescription className="text-gray-500" />
                      Company Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe your company's history, values, and what makes it unique..."
                      rows="9"
                      className="textarea textarea-bordered w-full text-base border-2 border-gray-300 focus:border-[#3C8F63] focus:outline-none rounded-lg resize-none"
                      maxLength={650}
                    />
                  </div>
                </div>

                {/* Mission Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-gray-700 text-lg">
                      <MdFlag className="text-gray-500" />
                      Company Mission
                    </label>
                    <textarea
                      name="mission"
                      placeholder="State your company's core purpose and what it aims to achieve..."
                      rows="3"
                      className="textarea textarea-bordered w-full text-base border-2 border-gray-300 focus:border-[#3C8F63] focus:outline-none rounded-lg resize-none"
                      maxLength={300}
                    />
                  </div>
                </div>

                {/* Vision Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-gray-700 text-lg">
                      <MdVisibility className="text-gray-500" />
                      Company Vision
                    </label>
                    <textarea
                      name="vision"
                      placeholder="Describe the future your company aspires to create..."
                      rows="3"
                      className="textarea textarea-bordered w-full text-base border-2 border-gray-300 focus:border-[#3C8F63] focus:outline-none rounded-lg resize-none"
                      maxLength={300}
                    />
                  </div>
                </div>

                {/* Tip Box */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <MdDescription className="text-green-600 text-xl mt-0.5" />
                    <div className="text-green-800 text-base">
                      <span className="font-semibold">Tip:</span> A compelling
                      about section helps candidates understand your company
                      culture and values. Keep it authentic and focused on what
                      makes your company unique.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="border-t bg-gray-50 px-6 py-4">
              <div className="flex justify-end gap-3">
                {/* Buttons_hear__ */}
              </div>
            </div>
          </div>

          {/* DaisyUI Modal Backdrop - Click to Close */}
          <form method="dialog">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default DigitalResume;
