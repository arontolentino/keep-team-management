import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormInput,
  FormSelect,
  ListLoading,
  NoData,
  Tabs,
} from '../../components';
import UserItem from './UserItem';
import {
  ACTIVE_SORT_BY_OPTIONS,
  SORT_DIRECTION_OPTIONS,
  USER_TYPES,
} from './users.constants';
import {
  getInvitesAsync,
  getUsersAsync,
  selectInvites,
  selectUsers,
} from './users.slice';

export default function UsersList() {
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const invites = useSelector(selectInvites);

  const [debounceTimer, setDebounceTimer] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortBy: ACTIVE_SORT_BY_OPTIONS.createdAt.value,
    sortDirection: SORT_DIRECTION_OPTIONS.desc.value,
  });

  useEffect(() => {
    (async () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(async () => {
        if (activeTab === USER_TYPES.ACTIVE || activeTab === 'ACTIVE') {
          await dispatch(await getUsersAsync(params));
        } else {
          await dispatch(await getInvitesAsync(params));
        }

        clearTimeout(debounceTimer);
      }, 500);

      setDebounceTimer(timer);
    })();
  }, [params, activeTab]);

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

      <Tabs
        tabs={Object.values(USER_TYPES)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mt-6 flex justify-between items-center">
        <FormInput
          name="searchTerm"
          className="w-64"
          type="text"
          placeholder="Search by name or email"
          onChange={(e) => onInputChange(e, setParams)}
        />
        <div className="flex space-x-4">
          <div className="flex items-center space-x-4">
            <p className="whitespace-nowrap text-sm">Sort by:</p>
            <FormSelect
              name="sortBy"
              value={JSON.stringify(ACTIVE_SORT_BY_OPTIONS[params.sortBy])}
              options={Object.values(ACTIVE_SORT_BY_OPTIONS)}
              onChange={(e) => onSelectChange(e, setParams)}
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
        {activeTab === USER_TYPES.ACTIVE || activeTab === 'ACTIVE' ? (
          <ul role="list" className="divide-y divide-gray-200">
            {!users ? (
              <ListLoading title="Loading users" />
            ) : users && (!users.results || users.results.length === 0) ? (
              <NoData title="No users found" />
            ) : (
              users.results.map((user) => <UserItem user={user} />)
            )}
          </ul>
        ) : (
          <ul role="list" className="divide-y divide-gray-200">
            {!invites ? (
              <ListLoading title="Loading invites" />
            ) : invites &&
              (!invites.results || invites.results.length === 0) ? (
              <NoData title="No invites found" />
            ) : (
              invites.results.map((user) => (
                <UserItem user={user} type={USER_TYPES.INVITED} />
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
