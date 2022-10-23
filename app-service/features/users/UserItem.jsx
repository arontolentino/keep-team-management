import { CalendarIcon, UserIcon } from '@heroicons/react/outline';
import moment from 'moment';
import { USER_TYPES } from './users.constants';

export default function UserItem({ user, type = USER_TYPES.ACTIVE }) {
  return (
    <li key={user.id}>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="truncate font-medium text-black">{user.name}</p>
            <div className="ml-2 flex flex-shrink-0">
              <p className="inline-flex capitalize rounded-full bg-gray-200 px-2 text-xs font-semibold leading-5 text-black">
                {/* {position.type} */}
                {user.role.name}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <UserIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {user.email}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p>
                {type === USER_TYPES.ACTIVE ? 'Joined on' : 'Invited on'}{' '}
                {moment(user.createdAt).format('LL')}
              </p>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
