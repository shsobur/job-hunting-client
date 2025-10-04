import "./Navbar.css";
import logo from "../../../../public/fab.png";
import { Link, NavLink } from "react-router-dom";
import useUserData from "../../../Hooks/userData";
import { AuthContext } from "../../../Context/AuthContext";

// From react__
import { useContext, useEffect, useRef, useState } from "react";

// Package(REACT ICONS, SWEET ALERT)__
import Swal from "sweetalert2";
import { RxCross1 } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { HiMiniUserCircle } from "react-icons/hi2";
import { AiOutlineShopping } from "react-icons/ai";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { IoChevronDown, IoChevronUp, IoHomeOutline } from "react-icons/io5";

const Navbar = () => {
  const menuRef = useRef();
  const { profile } = useUserData();
  const { user, logOut, userLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle Close Dropdown__
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Scrolling__
  useEffect(() => {
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else if (scrollTop < lastScrollTop) {
        setIsScrollingDown(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Stop Scroll__
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";
  }, [menuOpen]);

  // User logout__
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You went to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f70000",
      cancelButtonColor: "#007c01",
      confirmButtonText: "Yes, Log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Finished!",
            text: "Log out successfully",
            icon: "success",
          });
        });
      }
    });
    setOpen(!open);
  };

  return (
    <>
      <nav>
        {/* Desktop layout__ */}
        <div
          id={isScrollingDown ? "navbar_close" : "navbar_open"}
          className="main_navbar_container"
        >
          <div className="navbar_content_container">
            {userLoading ? (
              <div className="h-10 w-56 bg-gray-200 round-lg"></div>
            ) : (
              <div className="navbar_logo">
                <img src={logo} alt="JobHunting Logo" />
                <h1>JobHunting</h1>
              </div>
            )}

            <ul className="navbar_routes_container">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                {userLoading ? (
                  <div className="h-8 w-14 bg-gray-200 rounded-lg"></div>
                ) : (
                  <li>Home</li>
                )}
              </NavLink>

              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                {userLoading ? (
                  <div className="h-8 w-14 bg-gray-200 rounded-lg"></div>
                ) : (
                  <li>Community</li>
                )}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                {userLoading ? (
                  <div className="h-8 w-14 bg-gray-200 rounded-lg"></div>
                ) : (
                  <li>About Us</li>
                )}
              </NavLink>
            </ul>

            {userLoading ? (
              <span className="h-10 w-10 mr-5 rounded-full bg-gray-200"></span>
            ) : (
              <>
                {user ? (
                  <div className="dropdown_wrapper" ref={menuRef}>
                    <button
                      className="dropdown_button"
                      onClick={() => setOpen(!open)}
                    >
                      <div className="user_info">
                        {profile?.profilePhoto ? (
                          <img
                            src={profile.profilePhoto}
                            alt="Profile"
                            className="user_avatar"
                          />
                        ) : (
                          <div className="user_avatar_default">
                            <HiMiniUserCircle />
                          </div>
                        )}
                        <span className="user_name">
                          {profile?.userName || "User"}
                        </span>
                      </div>
                      {open ? (
                        <IoChevronUp size={18} />
                      ) : (
                        <IoChevronDown size={18} />
                      )}
                    </button>

                    <div
                      id="dropdown_item_parent_container"
                      className={`dropdown_menu ${open ? "open" : ""}`}
                    >
                      {/* User Info Section */}
                      <div className="user_profile_section">
                        {profile?.profilePhoto ? (
                          <img
                            src={profile.profilePhoto}
                            alt="Profile"
                            className="profile_image"
                          />
                        ) : (
                          <div className="profile_image_default">
                            <HiMiniUserCircle />
                          </div>
                        )}
                        <div className="profile_info">
                          <div className="profile_name">
                            {profile?.userName || "Welcome User"}
                          </div>
                          <div className="profile_email">
                            {user?.email || "User"}
                          </div>
                        </div>
                      </div>

                      <div className="dropdown_divider"></div>

                      <NavLink
                        to={
                          profile?.userRole === "Recruiter"
                            ? "/recruiter-profile"
                            : "/user-profile"
                        }
                      >
                        <span
                          onClick={() => setOpen(!open)}
                          className="dropdown_item"
                        >
                          <ImProfile />
                          My Profile
                        </span>
                      </NavLink>

                      <span
                        onClick={handleSignOut}
                        className="dropdown_item logout_item"
                      >
                        <MdOutlineLogout />
                        Sign Out
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link to="/sign-in">
                    <button className="desktop_signIn_btn">Sign In</button>
                  </Link>
                )}
              </>
            )}

            <div className="mobile_menu_container">
              <span onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <RxCross1 /> : <IoIosMenu />}
              </span>
            </div>
          </div>

          {/* Mobile layout__ */}
          <div
            id={menuOpen ? "" : "menu_close"}
            className="main_mobile_menu_container"
          >
            <div className="mobile_menu_routes">
              <ul>
                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <IoHomeOutline /> Home
                  </NavLink>
                </li>

                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/community"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <AiOutlineShopping /> Community
                  </NavLink>
                </li>

                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <ImProfile /> About Us
                  </NavLink>
                </li>
              </ul>

              <div className="others_routes_container">
                <ul>
                  {user ? (
                    <>
                      <li
                        className="mt-3"
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        <NavLink
                          to={
                            profile?.userRole === "Recruiter"
                              ? "/recruiter-profile"
                              : "/user-profile"
                          }
                          className={({ isActive }) =>
                            isActive
                              ? "mobile_menu_active_style"
                              : "mobile_menu_non_active_style"
                          }
                        >
                          <ImProfile /> Profile
                        </NavLink>
                      </li>
                      <li
                        onClick={handleSignOut}
                        className="mobile_menu_non_active_style"
                      >
                        <PiSignOut />
                        Sign Out
                      </li>
                    </>
                  ) : (
                    <li onClick={() => setMenuOpen(!menuOpen)}>
                      <NavLink
                        to="/sign-in"
                        className={({ isActive }) =>
                          isActive
                            ? "mobile_menu_active_style"
                            : "mobile_menu_non_active_style"
                        }
                      >
                        <PiSignIn />
                        Sign In
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
