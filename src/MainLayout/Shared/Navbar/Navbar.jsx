import "./Navbar.css";
import logo from "../../../../public/fab.png";
import { Link, NavLink } from "react-router-dom";

// React icons__
import { RxCross1 } from "react-icons/rx";
import { PiSignIn } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";
import { IoChevronDown, IoChevronUp, IoHomeOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { AiOutlineShopping } from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";

// From react__
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { ImProfile } from "react-icons/im";
import Swal from "sweetalert2";

const Navbar = () => {
  const menuRef = useRef();
  const [open, setOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext);

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
            <div className="navbar_logo">
              <img src={logo}></img>
              <h1>JobHunting</h1>
            </div>

            <ul className="navbar_routes_container">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>Community</li>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>About Us</li>
              </NavLink>
            </ul>

            {user ? (
              <div className="dropdown_wrapper" ref={menuRef}>
                <button
                  className="dropdown_button"
                  onClick={() => setOpen(!open)}
                >
                  <HiMiniUserCircle />
                  {open ? (
                    <IoChevronUp size={25} />
                  ) : (
                    <IoChevronDown size={25} />
                  )}
                </button>

                <div
                  id="dropdown_item_parent_container"
                  className={`dropdown_menu ${open ? "open" : ""}`}
                >
                  <NavLink>
                    <span
                      onClick={() => setOpen(!open)}
                      className="dropdown_item"
                    >
                      <ImProfile />
                      Profile
                    </span>
                  </NavLink>

                  <span onClick={handleSignOut} className="dropdown_item">
                    <MdOutlineLogout />
                    Log Out
                  </span>
                </div>
              </div>
            ) : (
              <Link to="/sign-in">
                <button className="desktop_signIn_btn btn text-white bg-[#3C8F63]">Sign Up</button>
              </Link>
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
                    <FiMessageCircle /> About Us
                  </NavLink>
                </li>

                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <RiContactsBook2Line /> _Contact
                  </NavLink>
                </li>
              </ul>

              <div className="others_routes_container">
                <ul>
                  <li onClick={() => setMenuOpen(!menuOpen)}>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "mobile_menu_active_style"
                          : "mobile_menu_non_active_style"
                      }
                    >
                      <MdOutlineSpaceDashboard /> Dashboard
                    </NavLink>
                  </li>

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
