import { CalendarIcon, UserIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormInput,
  FormSelect,
  ListLoading,
  NoData,
} from '../../components';
import { SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS } from './users.constants';
import {
  getUsersAsync,
  selectIsUsersLoading,
  selectUsers,
} from './users.slice';
import UsersTab from './UsersTab';

export default function UsersList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortBy: SORT_BY_OPTIONS.createdAt.value,
    sortDirection: SORT_DIRECTION_OPTIONS.desc.value,
  });

  const users = useSelector(selectUsers);
  const isUsersLoading = useSelector(selectIsUsersLoading);

  useEffect(() => {
    (async () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(async () => {
        await dispatch(await getUsersAsync(params));

        clearTimeout(debounceTimer);
      }, 500);

      setDebounceTimer(timer);
    })();
  }, [params]);

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setParams((previousValues) => {
      return { ...previousValues, [name]: value };
    });
  };

  const onSelectChange = (e) => {
    const value = JSON.parse(e.target.value).value;
    const name = e.target.name;

    setParams((previousValues) => {
      return { ...previousValues, [name]: value };
    });
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Link href="/team-management/invite">
          <a>
            <Button>Invite Team Member</Button>
          </a>
        </Link>
      </div>

      <UsersTab />

      <div className="mt-6 flex justify-between items-center">
        <FormInput
          name="searchTerm"
          className="w-64"
          type="text"
          placeholder="Search by name or email"
          onChange={onInputChange}
        />
        <div className="flex space-x-4">
          <div className="flex items-center space-x-4">
            <p className="whitespace-nowrap text-sm">Sort by:</p>
            <FormSelect
              name="sortBy"
              value={JSON.stringify(SORT_BY_OPTIONS[params.sortBy])}
              options={Object.values(SORT_BY_OPTIONS)}
              onChange={onSelectChange}
            />
          </div>

          <div className="flex items-center space-x-4">
            <p className="whitespace-nowrap text-sm ">Sort Direction:</p>
            <FormSelect
              name="sortDirection"
              value={JSON.stringify(
                SORT_DIRECTION_OPTIONS[params.sortDirection]
              )}
              options={Object.values(SORT_DIRECTION_OPTIONS)}
              onChange={onSelectChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden bg-white">
        <ul role="list" className="divide-y divide-gray-200">
          {isUsersLoading || !users ? (
            <ListLoading title="Loading users" />
          ) : users && (!users.results || users.results.length === 0) ? (
            <NoData title="No users found" />
          ) : (
            users.results.map((user) => (
              <li key={user.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate font-medium text-black">
                        {user.name}
                      </p>
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
                        <p>Joined on {moment(user.createdAt).format('LL')}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
