import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "@/context/auth";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Dwopdown = (props: { username: string }) => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <PersonIcon className="text-[20px] text-gray-400" />
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute dropdown   z-10 mt-2 w-[170px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? " bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full  px-4 py-4 text-left text-sm"
                  )}>
                  {props.username}
                </button>
              )}
            </Menu.Item>
          </div>
          {/* <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}>
                  პაროლის შეცვლა
                </Link>
              )}
            </Menu.Item>
          </div> */}
          <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}>
                    გამოსვლა
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
          <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}></button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dwopdown;
