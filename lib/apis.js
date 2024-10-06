import { readItems, readItem } from '@directus/sdk';
import directus from '@/lib/directus';
export const revalidate = 50;
export const getTrips = async () => {
  try {
    const trips = await directus.request(readItems('trips', {
      next: {
        revalidate: 15
      },
      fields: [
        // '*',
        'id',
        'sort',
        // 'related_route.route_name',
        'boat',
        // 'currMonth',
        'trip_status',
        'trip_images.*',
        'trip_images',
        'days.*',
        'Highlights',
        'included',
        'trip_schedules.*',
        // 'trip_schedule.related_route.*',
        // 'trip_schedule.related_route.route_name',
        'related_route.*',
        // 'related_route.route_images.*',


        {
          related_route: [
            'id',
            'sort',
            'route_name',
            'description',
            'route_images.*',
          ],

          trip_schedules: [

            'id',
            'sort',
            'date_created',
            'date_updated',
            'start_date',
            'end_date',
            'status',
            'price',
            'schedules_status',

            'currency',
            'available_places',
            'related_route.*',
            'start',
            'end',
            {
              trip_schedule: ['related_route.route_name'],
            }

          ],
          sort: ['start_date'],


        },


      ],
      sort: ['sort'],

    }));
    return trips;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// get cabins
export const getCabins = async () => {
  try {
    const response = await directus.request(readItems('cabins', {
      next: {
        revalidate: 15,
      },
      fields: [
        'id',
        'cabin_name',
        'cabin_price',
        'currency',
      ],
    }));
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAboutUs = async () => {
  try {
    const response = await directus.request(readItems('about', {
      next: {
        revalidate: 15,
      },
      fields: [



        {
          page_sections: ['list', 'direction', 'sort', 'id', 'title', 'description', 'image',
             
          ],
          sort: ['sort'],
        },



      ],
    }));
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getPageData = async () => {
  try {
    const response = await directus.request(readItems('programs_and_trips', {
      next: {
        revalidate: 15,
      },
      fields: [
        '*',
        'id',
        'title',
        'description',
        'trips_page_image',
        'schedules_page_image',
      ],
    }));
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTripById = async (id) => {
  try {
    const response = await directus.request(readItem('trips', id, {
      next: {
        revalidate: 15,
      },
      fields: [
        // '*',
        'id',
        'sort',
        // 'related_route.route_name',
        'boat',
        // 'currMonth',
        'trip_status',
        'trip_images.*',
        'trip_images',
        'days.*',
        'Highlights',
        'included',
        'trip_schedules.*',
        // 'trip_schedule.related_route.*',
        // 'trip_schedule.related_route.route_name',
        'related_route.*',
        // 'related_route.route_images.*',


        {
          related_route: [
            'id',
            'sort',
            'route_name',
            'description',
            'route_images.*',
          ],

          trip_schedules: [

            'id',
            'sort',
            'date_created',
            'date_updated',
            'start_date',
            'end_date',
            'status',
            'price',
            'schedules_status',

            'currency',
            'available_places',
            'related_route.*',
            'start',
            'end',
            {
              trip_schedule: ['related_route.route_name'],
            }
          ],
          location_pointer: [
            {
              map_data_id: ['id', 'title', 'pointer', 'sort', 'top', 'left'],
            },
          ],
          days: [
            {
              item: ['id', 'day_details', 'day_number', 'sort', 'status'],
            },
          ],
        },

      ],
    }));

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getTripsRoute = async () => {
  try {
    const response = await directus.request(readItems('trips', {
      fields: ['id',
        {
          related_route: ['id', 'sort', 'route_name', 'description', 'route_images.*'],
        }

      ],
      sort: ['sort'],
    }));
    return response
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRoutes = async () => {
  try {
    const response = await directus.request(
      readItems('routes', {
        fields: ['id', 'route_name', 'description', 'route_images.*'],
        sort: ['sort'],
      })
    );
    return response
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTripSchedules = async (id) => {
  try {
    const response = await directus.request(readItem('schedules', id, {

      // filter: {
      //   trip_schedule: id
      // },
      fields: [
        // '*',
        'id',
        'sort',
        'start_date',
        'end_date',
        'status',
        'price',
        'schedules_status',
        'currency',
        'start',
        'end',
        'available_places',


        {
          trip_schedule: [
            // '*',
            'id',
            'sort',
            'related_route.route_name',




          ],
        }
      ],
      // sort: ['start_date' ?? 'sort'],

    }));
    return response
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getAllSchedules = async () => {
  try {
    const response = await directus.request(readItems('schedules', {

      fields: [
        // '*',
        'id',
        'sort',
        'start_date',
        'end_date',
        'status',
        'price',
        'schedules_status',
        'currency',
        'start',
        'end',
        'available_places',


        {
          trip_schedule: [
            // '*',
            'id',
            'sort',
            'related_route.route_name',
            'boat',





          ],
        }
      ],
      sort: ['start_date' ?? 'sort'],

    }));
    return response
  } catch (error) {
    console.error(error);
    return null;
  }
}