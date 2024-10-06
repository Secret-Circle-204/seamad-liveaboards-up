const menuData = [
  {
    id: 1,
    title: 'Home',
    path: '/',
    newTab: false
  },
  // {
  //   id: 6,
  //   title: 'program',
  //   path: '/program',
  //   newTab: false
  // },
  {
    id: 2,
    title: 'About Us',
    path: '/about',
    newTab: false
  },
  // {
  //   id: 33,
  //   title: 'Blog',
  //   path: '/blog',
  //   newTab: false
  // },
  {
    id: 7,
    title: 'Programs & Trips',
    path: '/trips',
    newTab: false
  },
  {
    id: 5,
    title: 'Menu',
    path: '/menu',
    newTab: true
  },
  // {
  //   id: 5,
  //   title: 'The Boat',
  //   path: '/boat',
  //   newTab: false
  // },

  {
    id: 4,
    title: 'Services',
    newTab: false,
    submenu: [
      {
        id: 41,
        title: 'Service-1',
        path: `/services/`,
        newTab: false
      },
      {
        id: 41,
        title: 'Service-2',
        path: `/services/1`,
        newTab: false
      },
      {
        id: 41,
        title: 'service-3',
        path: `/services/2`,
        newTab: false
      },
      {
        id: 41,
        title: 'service-4',
        path: `/services/3`,
        newTab: false
      }
      // {
      //   id: 49,
      //   title: 'Blog',
      //   path: '/blog',
      //   newTab: false
      // }
      // {
      //   id: 50,
      //   title: 'Dive Tips & Hints',
      //   path: '/dive-tips',
      //   newTab: false
      // }
    ]
  },
  {
    id: 3,
    title: 'Contact Us',
    path: '/contact',
    newTab: false
  }

  // {
  //   id: 4,
  //   title: 'The Boats',
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 41,
  //       title: '',
  //       path: '/boat',
  //       newTab: false
  //     },
  //     {
  //       id: 49,
  //       title: 'Rooms Details',
  //       path: '/the-boat/rooms-details',
  //       newTab: false
  //     },
  //     {
  //       id: 42,
  //       title: 'food and drink',
  //       path: '/the-boat/food-and-drink',
  //       newTab: false
  //     },
  //     {
  //       id: 43,
  //       title: 'Diving Boards',
  //       path: '/the-boat/diving-boards',
  //       newTab: false
  //     }
  //     // {
  //     //   id: 44,
  //     //   title: '',
  //     //   path: '/',
  //     //   newTab: false
  //     // },
  //     // {
  //     //   id: 45,
  //     //   title: 'Blog Details Page',
  //     //   path: '/blog-details',
  //     //   newTab: false
  //     // }
  //   ]
  // }
]
export default menuData
