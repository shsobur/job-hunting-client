import "./UserProfile.css";

const UserProfile = () => {
  return (
    <>
      <div
        className="bg-gray-50 text-gray-800"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div className="max-w-[1536px] mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <aside className="lg:col-span-1 flex flex-col gap-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Stats
                </h3>
                <div className="flex justify-around text-center">
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-gray-500">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-sm text-gray-500">Skills</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-gray-500">Certifications</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Open to Work
                  </span>
                </div>
              </div>

              {/* Availability / Contact Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Availability / Contact Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">
                      location_on
                    </span>
                    <span className="text-gray-700">London, UK</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">
                      mail
                    </span>
                    <a
                      className="text-blue-600 hover:underline"
                      href="mailto:ethan.carter@example.com"
                    >
                      ethan.carter@example.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">
                      call
                    </span>
                    <a
                      className="text-blue-600 hover:underline"
                      href="tel:+442079460958"
                    >
                      +44 20 7946 0958
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <a className="text-gray-500 hover:text-blue-600" href="#">
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-2.16-1.57-2.16-1.05 0-1.43.72-1.67 1.37a2 2 0 00-.1.75V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.42C18.24 9.88 19 11.43 19 13.82z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500 hover:text-gray-900" href="#">
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.238 2.946 7.828 6.84 8.784.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.86.62-3.463-1.383-3.463-1.383-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.34 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.942 0-1.09.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.645 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.336 1.909-1.296 2.747-1.026 2.747-1.026.546 1.375.201 2.392.1 2.645.64.698 1.03 1.592 1.03 2.682 0 3.84-2.338 4.685-4.566 4.935.359.308.678.92.678 1.852 0 1.336-.012 2.414-.012 2.742 0 .268.18.578.688.48A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500 hover:text-gray-900" href="#">
                    <span className="material-symbols-outlined">link</span>
                  </a>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    English (Native)
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    French (Professional)
                  </span>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="bg-[#3c8f63] border border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-white text-3xl">
                    lightbulb
                  </span>
                  <div>
                    <h4 className="font-bold text-white">
                      Recommended Action
                    </h4>
                    <p className="text-sm text-white">
                      Add more skills to your profile to attract more
                      opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-2 flex flex-col gap-6">
              {/* Profile Header */}
              <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                  <button className="bg-white/50 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/80 transition-colors">
                    <span className="material-symbols-outlined text-gray-700">
                      edit
                    </span>
                  </button>
                </div>
                <div
                  className="h-48 bg-gray-200 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuIfwPFD1JIrtD5IMavuFqP_YXpU-HdtYPGXvUCp0V2bX5S9-4dq0mWuTkLeexSpqzwGnyizj_fG4w6PTTjz4nX1MQQ_SwqevkDQzZX8TwYzinu477HE3iCDgj-cB1kEoAYecMZRplkqJ4QPlNndYopeneCvPXmeJSuxNTFXhgxnXvnnJKNpQmRxk90uVjYgqZlF6EoInGPjjkNoFi8BJikIE_hYgYhjXMht4aX8JHjm-llqRkZrdS2MwdNJU7sZNStRxjghaKxXc')",
                  }}
                ></div>
                <div className="p-6 relative">
                  <div className="absolute top-4 right-4">
                    <button className="bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                      <span className="material-symbols-outlined text-gray-700">
                        edit
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-24 sm:-mt-16">
                    <div className="relative">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-white shadow-md"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAr0-blNlLHkSEJME4V8bPYsQQIj2kWlhF7a20F3otCVJNlvC3X5Yvt1KFuQDDqDfs3USrH1jEUSs_sH8rLjJ93q7K71jU_e6ItN8WvtLX_pik-Cd1PslJDD2M-Vu66zafXTFzSs-W7FzAnIj2JmdSXHGD5xATzXYU6L6z03SWu7wKNTiwbOqnDJjsiHkZVz7HmpWNbso_LngdBa9bQbfZVkVv0JM9aAkJNvEJlMqlLVHeMFcQRz7KhVwEcZqoBNp7MRNMUHpm_JOY")',
                        }}
                      ></div>
                    </div>
                    <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Ethan Carter, 28
                        </h2>
                      </div>
                      <p className="text-gray-600">
                        Product Designer in London, UK, He/Him
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-lg shadow-sm p-6 relative">
                <button className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    edit
                  </span>
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                <p className="text-gray-600 leading-relaxed">
                  I'm a British designer currently living in London, UK. I'm
                  huge fan of gothic typefaces and single shot espressos. I love
                  talking about comic books.
                </p>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-lg shadow-sm p-6 relative">
                <button className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    edit
                  </span>
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Experience
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Product Designer at DesignStudio
                    </h4>
                    <p className="text-sm text-gray-500">
                      Jan 2020 – Present | London, UK
                    </p>
                    <p className="text-gray-600 mt-2">
                      Leading the design team for client projects, focusing on
                      product experiences and user-centered solutions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      UX Designer at CreativeWorks
                    </h4>
                    <p className="text-sm text-gray-500">
                      Jun 2016 – Dec 2019 | London, UK
                    </p>
                    <p className="text-gray-600 mt-2">
                      Worked on diverse design projects, creating user-friendly
                      interfaces and improving user journeys.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-lg shadow-sm p-6 relative">
                <button className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    edit
                  </span>
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Education
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      MA in Interaction Design
                    </h4>
                    <p className="text-sm text-gray-500">
                      University of London | 2014 – 2016
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      BA in Graphic Design
                    </h4>
                    <p className="text-sm text-gray-500">
                      University of London | 2010 – 2014
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg shadow-sm p-6 relative">
                <button className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    edit
                  </span>
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#3C8F63] text-white px-4 py-1 rounded-full text-lg font-medium">
                    UX Design
                  </span>
                  <span className="bg-[#3C8F63] text-white px-4 py-1 rounded-full text-lg font-medium">
                    UI Design
                  </span>
                  <span className="bg-[#3C8F63] text-white px-4 py-1 rounded-full text-lg font-medium">
                    Prototyping
                  </span>
                  <span className="bg-[#3C8F63] text-white px-4 py-1 rounded-full text-lg font-medium">
                    Wireframing
                  </span>
                  <span className="bg-[#3C8F63] text-white px-4 py-1 rounded-full text-lg font-medium">
                    Figma
                  </span>
                  <span className="bg-[#3C8F63] text-white px-4 py-1 rounded-full text-lg font-medium">
                    Adobe XD
                  </span>
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white rounded-lg shadow-sm p-6 relative">
                <button className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    edit
                  </span>
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Projects
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Mobile Banking App Redesign
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Improved the usability and visual design of a major UK
                      bank’s mobile app, resulting in a 20% increase in user
                      satisfaction.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      E-commerce Website
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Designed and prototyped a responsive e-commerce platform
                      with an enhanced checkout experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-lg shadow-sm p-6 relative">
                <button className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    edit
                  </span>
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Certifications
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Google UX Design Certificate
                    </h4>
                    <p className="text-sm text-gray-500">Issued: 2021</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Adobe Certified Expert (Adobe XD)
                    </h4>
                    <p className="text-sm text-gray-500">Issued: 2020</p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
