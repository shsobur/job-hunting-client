import { useState, useEffect } from "react";
import { RiFacebookCircleLine, RiTelegramLine } from "react-icons/ri";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { TbBrandDiscord } from "react-icons/tb";
import { FcDribbble } from "react-icons/fc";
import { BsReddit } from "react-icons/bs";

const SocialLinksModal = ({ profile }) => {
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    x: "",
    additionalLinks: {},
  });

  const [isLoading, setIsLoading] = useState(false);

  // Common social media platforms
  const socialPlatforms = [
    {
      key: "facebook",
      name: "Facebook",
      icon: <RiFacebookCircleLine color="#1877f2" size={30} />,
      placeholder: "https://facebook.com/username",
    },
    {
      key: "instagram",
      name: "Instagram",
      icon: <FaInstagram color="#C13584" size={28} />,
      placeholder: "https://instagram.com/username",
    },
    {
      key: "telegram",
      name: "Telegram",
      icon: <RiTelegramLine color="#0088cc" size={32} />,
      placeholder: "https://t.me/username",
    },
    {
      key: "youtube",
      name: "YouTube",
      icon: <FiYoutube color="#ff0000" size={30} />,
      placeholder: "https://youtube.com/username",
    },
    {
      key: "github",
      name: "GitHub",
      icon: <FaGithub size={30} />,
      placeholder: "https://github.com/username",
    },
    {
      key: "dribbble",
      name: "Dribbble",
      icon: <FcDribbble size={30} />,
      placeholder: "https://dribbble.com/username",
    },

    {
      key: "discord",
      name: "Discord",
      icon: <TbBrandDiscord color="#7289DA" size={30} />,
      placeholder: "https://discord.gg/invite-code",
    },

    {
      key: "reddit",
      name: "Reddit",
      icon: <BsReddit color="#ff5700" size={30} />,
      placeholder: "https://reddit.com/user/username",
    },
  ];

  // Initialize form data with profile data
  useEffect(() => {
    if (profile?.socialLinks) {
      setSocialLinks({
        linkedin: profile.socialLinks.linkedin || "",
        x: profile.socialLinks.x || "",
        additionalLinks: profile.socialLinks.additionalLinks || {},
      });
    }
  }, [profile]);

  const handleMainLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdditionalLinkChange = (platformKey, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      additionalLinks: {
        ...prev.additionalLinks,
        [platformKey]: value,
      },
    }));
  };

  const addSocialPlatform = (platformKey) => {
    if (!socialLinks.additionalLinks[platformKey]) {
      setSocialLinks((prev) => ({
        ...prev,
        additionalLinks: {
          ...prev.additionalLinks,
          [platformKey]: "",
        },
      }));
    }
  };

  const removeSocialPlatform = (platformKey) => {
    const updatedLinks = { ...socialLinks.additionalLinks };
    delete updatedLinks[platformKey];
    setSocialLinks((prev) => ({
      ...prev,
      additionalLinks: updatedLinks,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare data for submission
      const submissionData = {
        linkedin: socialLinks.linkedin,
        x: socialLinks.x,
        additionalLinks: Object.fromEntries(
          Object.entries(socialLinks.additionalLinks).filter(
            ([, value]) => value.trim() !== ""
          )
        ),
      };

      console.log("Submitting social links:", submissionData);

      
    } catch (error) {
      console.error("Error updating social links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get platforms that are not currently added
  const availablePlatforms = socialPlatforms.filter(
    (platform) => !socialLinks.additionalLinks[platform.key]
  );

  return (
    <>
      <section>
        <dialog id="res_social_links_modal" className="modal">
          <div className="modal-box max-w-[1024px] max-h-[90vh] overflow-y-auto">
            <form method="dialog" className="mb-5">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2"
                onClick={() =>
                  document.getElementById("res_social_links_modal").close()
                }
              >
                <span className="text-2xl font-semibold text-gray-700">×</span>
              </button>
            </form>

            <div className="contact_update_main_content_container">
              <h1 className="modal_title font-semibold font-[Montserrat] text-3xl">
                {profile?.socialLinks
                  ? "Update Social Links"
                  : "Add Social Links"}
              </h1>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* LinkedIn - Always visible */}
                <div>
                  <label
                    className="flex items-end text-xl font-medium mb-2"
                    htmlFor="linkedin"
                  >
                    <span className="mr-2">
                      <FaLinkedin size={25} color="#0077b5" />
                    </span>{" "}
                    LinkedIn
                  </label>
                  <input
                    disabled={isLoading}
                    type="url"
                    className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                    id="linkedin"
                    name="linkedin"
                    value={socialLinks.linkedin}
                    onChange={handleMainLinkChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                {/* X (Twitter) - Always visible */}
                <div>
                  <label
                    className="flex items-end text-xl font-medium mb-2"
                    htmlFor="x"
                  >
                    <span className="mr-2">
                      <FaTwitterSquare size={25} color="#1da1f2" />
                    </span>{" "}
                    X (Twitter)
                  </label>
                  <input
                    disabled={isLoading}
                    type="url"
                    className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                    id="x"
                    name="x"
                    value={socialLinks.x}
                    onChange={handleMainLinkChange}
                    placeholder="https://x.com/username"
                  />
                </div>

                {/* Additional Social Links */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xl font-medium">
                      Additional Social Links
                    </label>
                    <span className="text-sm text-gray-500">
                      {Object.keys(socialLinks.additionalLinks).length} added
                    </span>
                  </div>

                  {/* Display added social links */}
                  {Object.entries(socialLinks.additionalLinks).map(
                    ([platformKey, value]) => {
                      const platform = socialPlatforms.find(
                        (p) => p.key === platformKey
                      );
                      return (
                        <div
                          key={platformKey}
                          className="mb-4 p-4 border border-gray-200 rounded-md relative"
                        >
                          <button
                            type="button"
                            onClick={() => removeSocialPlatform(platformKey)}
                            disabled={isLoading}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                          >
                            ×
                          </button>

                          <label className="block text-lg font-medium mb-2">
                            <span className="mr-2">{platform?.icon}</span>{" "}
                            {platform?.name}
                          </label>
                          <input
                            disabled={isLoading}
                            type="url"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                            value={value}
                            onChange={(e) =>
                              handleAdditionalLinkChange(
                                platformKey,
                                e.target.value
                              )
                            }
                            placeholder={platform?.placeholder}
                          />
                        </div>
                      );
                    }
                  )}

                  {/* Available platforms to add */}
                  {availablePlatforms.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">
                        Add more platforms:
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {availablePlatforms.map((platform) => (
                          <button
                            key={platform.key}
                            type="button"
                            onClick={() => addSocialPlatform(platform.key)}
                            disabled={isLoading}
                            className="flex flex-col items-center justify-center p-3 border-2 border-gray-300 rounded-md hover:border-[#3C8F63] hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-2xl mb-1">
                              {platform.icon}
                            </span>
                            <span className="text-xs text-center">
                              {platform.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="modal-action mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="btn btn-outline w-full sm:w-auto px-4 sm:px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                    onClick={() =>
                      document.getElementById("res_social_links_modal").close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 w-full sm:w-auto px-4 sm:px-8 py-3 text-lg text-white"
                  >
                    {isLoading
                      ? "Working..."
                      : profile?.socialLinks
                      ? "Update Links"
                      : "Save Links"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default SocialLinksModal;
