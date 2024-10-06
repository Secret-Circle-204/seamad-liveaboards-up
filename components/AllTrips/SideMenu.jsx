import Link from 'next/link';
import Image from 'next/image';
import getAssetURL from '@/lib/get-asset-url';
export default function SideMenu({ routes }) {
  return (
    <div className='side-menu w-[300px] bg-white dark:bg-black p-4 rounded-md shadow-md'>
      <h3 className='text-lg font-bold'>Popular Routes</h3>
      <div className='w-3/4 h-1 bg-gray-200 dark:bg-gray-700 my-2 rounded-md'>
        <ul>
          <li className='my-2'>
            <Link href={`/trips/${routes?.id}`}>
              <Image src={getAssetURL(routes?.trip?.trip_images[0].directus_files_id) || ''} alt={routes?.trip?.trip_name} width={300} height={200} />
              <p className='text-gray-600 dark:text-gray-300'>{routes?.from} - {routes?.to}</p>
              {/* status */}
              <p className={`text-sm font-medium rounded-md px-2 py-1 ${routes?.trip_status === 'not_available' ? 'bg-yellow-400 text-black' : 'bg-green-500 text-white'}`}>
                {routes?.trip_status === 'not_available' ? 'Completed' : 'Available'}
              </p>
              {/* trip name */}
              <p className='text-blue-500 hover:underline'>{routes?.trip?.trip_name}</p>
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
}