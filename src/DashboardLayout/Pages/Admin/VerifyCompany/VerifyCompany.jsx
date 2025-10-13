import { useEffect, useState } from "react";
import { GrShieldSecurity } from "react-icons/gr";
import useAxios from "../../../../Hooks/Axios";
import AdminTableSkeleton from "../../../../Components/AdminTableSkeleton/AdminTableSkeleton";

const VerifyCompany = () => {
  const api = useAxios();
  const [verifyMessage, setVerifyMessage] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    setMessageLoading(true);
    const requestData = async () => {
      const res = await api.get("/admin-api/company-verify-request");
      if (res.data) { 
        setVerifyMessage(res.data);
        setMessageLoading(false);
      }
    };
    requestData();
  }, [api]);

  return (
    <>
      <div className="py-2 px-2 overflow-y-auto">
        <div className="w-full mx-auto">
          {/* Header Section */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3C8F63] rounded-2xl mb-4">
              <GrShieldSecurity size={35} color="white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Company Verification Requests
            </h1>
            <p className="text-gray-600">
              Review and verify company registration requests
            </p>
          </div>

          {/* Desktop Table View (above 1280px) */}
          <div className="hidden xl:block bg-white rounded-2xl border border-[#3c8f6320] overflow-hidden w-full">
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">
                      Company Name
                    </th>

                    <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">
                      Email
                    </th>

                    <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">
                      Submit Date
                    </th>

                    <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">
                      Profile Completed
                    </th>

                    <th className="text-left py-4 px-4 text-lg font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messageLoading ? (
                    <AdminTableSkeleton></AdminTableSkeleton>
                  ) : (
                    <>
                      {verifyMessage.map((company, idx) => (
                        <tr
                          key={company.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-800">
                              <b>{idx + 1}. </b>
                              {company.companyName}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="text-gray-600">{company.email}</div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="text-gray-600">
                              {company.submittedAt}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[#3C8F63] h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${company.completed}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {company.completed}%
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex gap-2">

                              <button className="px-4 py-2 bg-[#3C8F63] text-white rounded-xl font-medium hover:bg-[#2a6b4a] transition-all duration-200 shadow-lg shadow-[#3C8F63]/30 hover:shadow-xl hover:shadow-[#3C8F63]/40 text-sm">
                                Message
                              </button>

                              <button className="px-4 py-2 border-2 border-[#3C8F63] text-[#3C8F63] rounded-xl font-medium hover:bg-[#3C8F63] hover:text-white transition-all duration-200 text-sm">
                                Profile
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grid Layout for tablets and mobile (below 1280px) */}
          <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {verifyMessage.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-xl border border-[#3c8f6320] p-5 hover:shadow-2xl transition-all duration-200"
              >
                {/* Company Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {company.companyName}
                  </h3>
                  <p className="text-gray-600 text-sm">{company.email}</p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Submit Date:</span>
                    <span className="font-medium text-gray-700">
                      {company.submittedAt}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Profile Completed:</span>
                    <span className="font-medium text-gray-700">
                      {company.completed}%
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#3C8F63] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${company.completed}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {company.message}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">

                  <button className="flex-1 px-3 py-2 bg-[#3C8F63] text-white rounded-xl font-medium hover:bg-[#2a6b4a] transition-all duration-200 shadow-lg shadow-[#3C8F63]/30 hover:shadow-xl hover:shadow-[#3C8F63]/40 text-sm">
                    Message
                  </button>
                  
                  <button className="flex-1 px-3 py-2 border-2 border-[#3C8F63] text-[#3C8F63] rounded-xl font-medium hover:bg-[#3C8F63] hover:text-white transition-all duration-200 text-sm">
                    Profile
                  </button>

                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyCompany;
