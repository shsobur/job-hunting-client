import {
  FaRocket,
  FaCheckCircle,
  FaFlag,
  FaEye,
  FaLinkedin,
  FaTwitter,
  FaWrench,
  FaCode,
  FaChartLine,
  FaBullhorn,
  FaBuilding,
  FaHeadset,
} from "react-icons/fa";

const RecruiterProfile = () => {
  return (
    <div
      className="bg-gray-50 min-h-screen"
    >
      <div className="max-w-[1536px] mx-auto lg:p-5 p-3">
        <div className="overflow-hidden">
          {/* Header Section */}
          <div className="">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuetNezrPUqgcdgRGwjy3PXc535fNMM0UWC6FKfSA4pnIfkUcyUD2zaG0NtN13mZrI2EV2i9iSTRIyLRbx53A3idSkYGQ2s5b7q3pXWScjaclFGWHQFr7wwPcs-JZAycNsDIgPRMNw_VWpf5FbL1MIi44YK9ddTS0NbrbtLT1z9A13575wMXnWBe73Lo_DQd20Yqv4Z3rSGyynb85QTP0ygJEg1VvP2fIl1NzgfAxIN6A9hvwXF7owO3NXpsN1gZN1jrx3CzSak3Gq")',
                }}
              ></div>
              <div className="flex-grow">
                <h1 className="text-gray-900 text-3xl font-bold leading-tight tracking-[-0.015em]">
                  Tech Innovators Inc.
                </h1>
                <p className="text-gray-600 text-base mt-2">
                  Technology | 500-1000 employees | New York City
                </p>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <div className="bg-green-50 text-green-600 py-1 px-3 rounded-full font-medium inline-flex items-center gap-1 text-sm">
                    <FaRocket className="text-base" />
                    ActiveHire
                  </div>
                  <div className="bg-green-50 text-green-600 py-1 px-3 rounded-full font-medium inline-flex items-center gap-1 text-sm">
                    <FaCheckCircle className="text-base" />
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-y border-gray-200 mt-5">
            <div className="px-4 sm:px-8">
              <nav className="-mb-px flex space-x-6 overflow-x-auto">
                <a
                  className="border-b-2 border-green-600 text-green-600 py-4 px-1 text-sm font-semibold whitespace-nowrap"
                  href="#"
                >
                  Overview
                </a>
                <a
                  className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-semibold whitespace-nowrap"
                  href="#"
                >
                  Jobs
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Us Section */}
                <div className="text-gray-600">
                  <h2 className="text-gray-900 text-2xl font-bold mb-4">
                    About us
                  </h2>
                  <p>
                    Tech Innovators Inc. is a leading technology company
                    specializing in innovative software solutions for
                    businesses. Founded in 2005, we have grown to a team of over
                    500 employees, with our headquarters in New York City. Our
                    mission is to empower businesses through cutting-edge
                    technology, and our vision is to be the global leader in
                    business software solutions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <h2 className="text-gray-900 text-xl font-bold flex items-center gap-2 mb-2">
                        <FaFlag className="text-green-600" />
                        <span>Mission</span>
                      </h2>
                      <p className="text-gray-600">
                        To empower businesses through cutting-edge technology.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <h2 className="text-gray-900 text-xl font-bold flex items-center gap-2 mb-2">
                        <FaEye className="text-green-600" />
                        <span>Vision</span>
                      </h2>
                      <p className="text-gray-600">
                        To be the global leader in business software solutions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Departments Section */}
                <div>
                  <h2 className="text-gray-900 text-2xl font-bold mb-4">
                    Departments
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                      <FaWrench className="text-gray-600" />
                      <h3 className="text-gray-900 text-base font-semibold">
                        Engineering
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                      <FaCode className="text-gray-600" />
                      <h3 className="text-gray-900 text-base font-semibold">
                        Product
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                      <FaChartLine className="text-gray-600" />
                      <h3 className="text-gray-900 text-base font-semibold">
                        Sales
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                      <FaBullhorn className="text-gray-600" />
                      <h3 className="text-gray-900 text-base font-semibold">
                        Marketing
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                      <FaBuilding className="text-gray-600" />
                      <h3 className="text-gray-900 text-base font-semibold">
                        Finance
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                      <FaHeadset className="text-gray-600" />
                      <h3 className="text-gray-900 text-base font-semibold">
                        HR
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                <div>
                  <h2 className="text-gray-900 text-2xl font-bold mb-4">
                    Current Events / Gallery
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    <div className="col-span-2 row-span-2">
                      <img
                        alt="Company event 1"
                        className="rounded-lg object-cover w-full h-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnhk5Pc25LFOAYMMYnei2UMpIZfpAtNWs4OwIJwEDNkLCN0A9N903eEv4ZC2YwlCXUncF6GZKJC1JNh5L_UpwEYfH7kQDd4dHp-blKUPnbkFIXbsYMN2aA71HvQE_6-8EZI2TD3K1yHxG2ieMFyv9qG_E2aQmJxolCm0AOiON0ymQx4AVCW_AMwdnG5P9TrbynSPcZsHbJZZLXMJe7grGsgo6C8zwOxeRdYjx-_-4k_SKbxAH5qmCmsq-i77FAN7MD9svTYBayec2q"
                      />
                    </div>
                    <div>
                      <img
                        alt="Company event 2"
                        className="rounded-lg object-cover w-full h-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyc8P_guSKqUTUjT0Fzyb9Cm9-kOts-PwdJncnBNE0ezvmdrbg0pu4k6eg-ryOfA9pb6-hEHeTsZvakIi4SNWyGwBRzKHwBCqWr_1QYaKpJT9RZ7RqOKMSF8NTkH4pXGDe2wOwHhrznJESWBqHcPsUWF0diIyquzeReMFCES7sT6AMVSlMiH05uQscXL0ZetlJ17lpy7yzLaj5yJtG6C0LMMaj2mNjgNL2cBomnXBO92kSNrfVPI-BdwvdxcyUMp7HNSbt9KCmhUte"
                      />
                    </div>
                    <div>
                      <img
                        alt="Company event 3"
                        className="rounded-lg object-cover w-full h-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwBD6ZEKyydpwswGDQzA40z0jADWfSy-ZZSgw8ehP5Ttn9OyIPvb5by067gKeM3PBL8koDY-jA7Op2vfttEy3cCYziKCVz5nd7OHC8A3PS2pt8G56FCSteWyDRQ2i9iHCJh3GTElpWULXma5L7fXX-YWFbiabfsmcjOgL7JD4xwO1R_1ZLJ9hfJtD2y-6DVN5EcbIKjOZ5wooCJeqWUliiB1-C82xNC8epIVC8NVelbg-GR_UMclzzb8a0JmuDwB_PX10PsWg-POWD"
                      />
                    </div>
                    <div>
                      <img
                        alt="Company event 4"
                        className="rounded-lg object-cover w-full h-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxsIV8D5Q6oMWy-Xi3hbeqC90422eCRShMrrqMWmLjJ4jP489qb9WNfXbKcBkqYlMthvr0pqLR2E0VyhEQsjS1Iq7NwowCRH6LedJWe-2HILQF9N6EMUT3beP2-0iK0gHBA1Jb9v6bfWFjc-tEjGZJuR9eORHh_ak3dLSiIc6Rakdi_JWMsuGDFlL2ustUEjqgJ8HKdy1CFls5G5jWyOskuUUrdAP3p8ecfXQOwCTKp-a7yUCABE5QO1Ox-mdr_WLbklgJHaCmxpMV"
                      />
                    </div>
                    <div className="relative">
                      <img
                        alt="Company event 5"
                        className="rounded-lg object-cover w-full h-full blur-sm"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqclP6ydWJ8KWTejeq2rkEUZjHYXOZMk1ABGGA_Q18-cb-Vpn96UhBTA07giYayjDhUMyZQ8MSNkRLLrsPdZKkJh1rQj1arIN7YLKaHDkHxoHIcM_ytma4CFUEARTxDAlA8l8i5c8iHJJPzEOWnvXXMQ0kJm1evqSiyhnR3NMyrpkqvYo1W_4rO0T77fzGN8FapJc88SvY8l_YO8GPvH4h_f8fetS5EBTRhB-Dk3Uymd92e-SQKXLJX2LjkIfwDlIytkCh0rzbVhiN"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          5+ More
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <aside className="space-y-6">
                {/* Company Details */}
                <div className="bg-gray-50 rounded-lg p-2">
                  <h2 className="text-gray-900 text-xl font-bold mb-4">
                    Company Details
                  </h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Website</span>
                      <a
                        className="font-medium text-green-600 hover:underline"
                        href="#"
                      >
                        techinnovators.com
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Industry</span>
                      <span className="text-gray-900 font-medium">
                        Technology
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Company size</span>
                      <span className="text-gray-900 font-medium">
                        500-1000
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Founded</span>
                      <span className="text-gray-900 font-medium">2005</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Headquarters</span>
                      <span className="text-gray-900 font-medium">
                        New York City, NY
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Branches</span>
                      <span className="text-gray-900 font-medium text-right">
                        NYC, San Francisco
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key People */}
                <div className="bg-gray-50 rounded-lg p-2">
                  <h2 className="text-gray-900 text-xl font-bold mb-4">
                    Key People
                  </h2>
                  <div className="flex space-x-4 overflow-x-auto pb-2">
                    <div className="text-center flex-shrink-0">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 mx-auto"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBayWUlvMBTLiUf0DeYX2cjVXw-EhfMrKqINqxQAI1s4ts0OYCrKg_63ueN61qMW68FIZQUIgqdU1xYhOuKfGUfbryIY08-ggXMOGkBWPwG1snMjCHEj4tW5qfU6As1fGtHWMQteCMYhnXTXZfwU8Mc5Pb_VF3f6tDSVc-gh4ETgnGt42EdvPV_RmHoOPe9UfcOa2FAMYQZtxKfCFTCOmqwZV9sao4iGjgLKG5M7jAdKGxBMZ_KSoCopv3AfAxCrr7OsC_4Pwo9F840")',
                        }}
                      ></div>
                      <p className="text-gray-900 text-sm font-semibold mt-2">
                        Ethan Carter
                      </p>
                      <p className="text-gray-500 text-xs">CEO</p>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 mx-auto"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTSqdRxN-ly486ZUGAYT_4FERjezs4XEL74J64QQLo5_v7gJEUhW8XyySAcMbjclEAjHDWRpu9gNqFvISoquWh7MHuvs4CrPLlLBiCHxeuxZANPU7gvxaz9yatCNbT5GdwYMLt3izlfFIsS7W4huCMZGJglJcamG7lkD7pfqtD9AeB6eamg3SGNOszwqucNmTWUheSFyl0UmTofHINhFX-xT-jXNQUvDVlYBm6QUG1n77v8sd3j7__PYS0zpZphsQSNWl9ajH0EoYf")',
                        }}
                      ></div>
                      <p className="text-gray-900 text-sm font-semibold mt-2">
                        Olivia Bennett
                      </p>
                      <p className="text-gray-500 text-xs">Founder</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-gray-50 rounded-lg p-2">
                  <h2 className="text-gray-900 text-xl font-bold mb-4">
                    Social Links
                  </h2>
                  <div className="flex gap-4">
                    <a className="text-gray-500 hover:text-green-600" href="#">
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a className="text-gray-500 hover:text-green-600" href="#">
                      <FaTwitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;