import { CalendarIcon, UserIcon } from '@heroicons/react/outline';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components';
import { hasPermissions } from '../../utils';
import { selectUser } from '../auth/auth.slice';

export default function CardsList() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Cards</h1>

        {hasPermissions(user, ['CREATE_CARD']) ? (
          <Button>Create Card</Button>
        ) : (
          <Button>Request Card</Button>
        )}
      </div>
    </div>
  );
}
