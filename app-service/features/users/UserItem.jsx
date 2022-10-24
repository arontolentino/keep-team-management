import { CalendarIcon, UserIcon } from '@heroicons/react/outline';
import moment from 'moment';
import { Button } from '../../components';
import { copyToClipboard } from '../../utils';
import { USER_TYPES } from './users.constants';

export default function UserItem({ user, type = USER_TYPES.ACTIVE }) {
  return (
    <li key={user.id}>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 flex justify-between sm:px-6">
          <div className="space-y-2">
            <p className="truncate font-medium text-black">{user.name}</p>
            <p className="flex items-center text-sm text-gray-500">
              <UserIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {user.email}
            </p>
          </div>

          <div className="flex items-center">
            <div className="text-right space-y-2">
              <p className="inline-flex capitalize rounded-full bg-gray-200 px-2 text-xs font-semibold leading-5 text-black">
                {user.role.name}
              </p>{' '}
              <div className="flex items-center text-sm text-gray-500 sm:mt-0">
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

            {type === USER_TYPES.INVITED && (
              <div className="ml-6">
                <Button
                  className="text-xs"
                  onClick={() =>
                    copyToClipboard(
                      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/register?inviteId=${user.inviteId}`
                    )
                  }
                >
                  Copy Invite Link
                </Button>
              </div>
            )}
          </div>
        </div>
      </a>
    </li>
  );
}
