import { ReactNode } from 'react';

import TableChartTwoToneIcon from '@material-ui/icons/TableChartTwoTone';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Management',
    items: [
      {
        name: 'Master Data',
        icon: TableChartTwoToneIcon,
        link: '/management/transactions',
        items: [
            {
              name: 'Kategori',
              link: '/management/masterdata/category'
            },
            {
              name: 'Merk',
              link: '/management/masterdata/brand'
            },
            {
              name: 'Kota',
              link: '/management/masterdata/city'
            },
            {
              name: 'Produk',
              link: '/management/masterdata/product',
              items: [
                {
                  name: 'Warna',
                  link: '/management/masterdata/product/color'
                },
                {
                  name: 'Tenor',
                  link: '/management/masterdata/product/tenor'
                },
                {
                  name: 'Lokasi',
                  link: '/management/masterdata/product/location'
                },
              ]
            },
            {
              name: 'Artikel',
              link: '/management/masterdata/article'
            },
            {
              name: 'Diskusi',
              link: '/management/masterdata/discussion'
            },
            {
              name: 'Review',
              link: '/management/masterdata/review'
            },
            {
              name: 'Balasan Diskusi',
              link: '/management/masterdata/feedback'
            }
        ]
      },
      {
        name: 'User',
        icon: AccountCircleTwoToneIcon,
        link: '/management/profile',
        items: [
          {
            name: 'Profile Details',
            link: '/management/profile/details'
          },
          {
            name: 'User Settings',
            link: '/management/profile/settings'
          }
        ]
      }
    ]
  },
  {
    heading: 'Transaction',
    items: [
      {
        name: 'Purchase',
        icon: ShoppingCartIcon,
        link: '/components/buttons'
      }
    ]
  }
];

export default menuItems;