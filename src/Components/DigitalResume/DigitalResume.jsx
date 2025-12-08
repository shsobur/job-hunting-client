import { MdDescription, MdFlag, MdVisibility } from "react-icons/md";
import SeekerModalHeader from "../../Shared/SeekerModalHeader/SeekerModalHeader";
import { FaCheck, FaTimes } from "react-icons/fa";
import DigitalResumeContent from "../DigitalResumeContent/DigitalResumeContent";

const DigitalResume = () => {
  const handleCloseModal = () => {
    const modal = document.getElementById("rec_digital_Resume");
    modal.close();
  };

  return (
    <>
      <div>
        <dialog id="rec_digital_Resume" className="modal">
          <div className="modal-box max-w-[1024px] max-h-[95vh] flex flex-col p-0">
            {/* Header - Standard Modal Header */}
            <SeekerModalHeader
              title="Digital Resume"
              handleCloseModal={handleCloseModal}
            />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
              {/* Main Content - Digital Resume will go here */}
              <div className="p-6">
                {/* Digital Resume Content Area */}

                <div className="mb-8">
                  <DigitalResumeContent></DigitalResumeContent>
                </div>

                {/* Standard Tip Box - Exactly as you provided */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <MdDescription className="text-green-600 text-xl mt-0.5" />
                    <div className="text-green-800 text-base">
                      <span className="font-semibold">Tip:</span> Review the
                      candidate's resume thoroughly before making a decision.
                      Check for relevant experience, skills, and qualifications
                      that match your job requirements.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Only */}
            <div className="border-t bg-gray-50 px-6 py-4">
              <div className="flex justify-end gap-3">
                {/* Reject Button */}
                <button className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 active:bg-red-100 transition-all duration-200 flex items-center gap-2">
                  <FaTimes className="h-4 w-4" />
                  <span>Reject</span>
                </button>

                {/* Accept Button */}
                <button className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 active:bg-emerald-700 transition-all duration-200 flex items-center gap-2">
                  <FaCheck className="h-4 w-4" />
                  <span>Accept</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal backdrop click to close */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default DigitalResume;
