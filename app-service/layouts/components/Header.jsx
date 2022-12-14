import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import {
  logoutAsync,
  selectIsAuthenticated,
  selectUser,
} from '../../features/auth/auth.slice';
import { hasPermissions } from '../../utils';
import { Button } from '../../components';

export default function Example() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const navigation = [
    {
      name: 'Cards',
      href: '/cards',
      hasPermissions: hasPermissions(user, ['VIEW_CARDS']),
    },
    {
      name: 'Team Management',
      href: '/team-management',
      hasPermissions: hasPermissions(user, ['VIEW_USERS']),
    },
  ];

  return (
    <header>
      <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Keep Technologies Inc.</span>
              <img
                className="h-8 w-auto"
                src="https://uploads-ssl.webflow.com/62558bba1b2296492e8659f1/626c66e4b8f91d26950e998c_keep-logo.svg"
                alt=""
              />
            </a>

            {isAuthenticated && (
              <div className="ml-10 hidden space-x-8 lg:block">
                {navigation.map(
                  (link) =>
                    link.hasPermissions && (
                      <Link key={link.name} href={link.href}>
                        <a className="text-base font-medium hover:text-gray-500">
                          {link.name}
                        </a>
                      </Link>
                    )
                )}
              </div>
            )}
          </div>
          <div className="ml-10 space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  color="secondary"
                  onClick={async () => await dispatch(await logoutAsync())}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="inline-block rounded-md border border-transparent bg-black py-2 px-4 text-base text-white font-medium  hover:bg-opacity-75">
                    Sign in
                  </a>
                </Link>

                <Link href="/register">
                  <a className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-black hover:bg-gray-200">
                    Sign up
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-black hover:text-gray-500"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
