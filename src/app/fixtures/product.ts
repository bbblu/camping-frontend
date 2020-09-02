import { ProductGroup } from '../models/product';

export const Product: ProductGroup =
    {
        name: '4人帳四角睡帳客廳帳 桌椅 營燈 廚具',
        city: '中和區',
        price: '1200',
        borrowDateRange: '2020/08/14 15:00 ~ 2020/08/20 00:00',
        contactInformation: '10646018@ntub.edu.tw',
        productArray: [
            {
                id: 1,
                type: '客廳帳',
                count: 1,
                brand: '無',
                useInformation: '四人同時向外拉，並往上推，小心不要夾到手。若遇下雨，必須晒乾再收起來。',
                brokenCompensation: '損壞至無法使用，原價七成賠償。損壞布面，原價五成賠償。損壞小部分但堪用，原價三成賠償。',
                memo: '無',
                imageArray: [{
                    id: 1,
                    url: 'https://localhost:4200/logo.png',
                }],
                relatedLinkArray: [{
                    id: 1,
                    url: 'https://www.pcone.com.tw/product/info/190530961976#ref=d_search_listdefault_1',
                }],
            },
            {
                id: 2,
                type: '睡帳',
                count: 1,
                brand: 'Vidalido',
                useInformation: '內附搭帳棚說明書',
                brokenCompensation: '損壞至無法使用，原價七成賠償。損壞布面，原價五成賠償。損壞小部分但堪用，原價三成賠償。',
                memo: '無',
                imageArray: [{
                    id: 2,
                    url: 'https://imgur.com/Ks3BC7J',
                }],
                relatedLinkArray: [{
                    id: 2,
                    url: 'https://www.ruten.com.tw/item/show?21940122295445https://www.pcone.com.tw/product/info/190530961976#ref=d_search_listdefault_1',
                }],
            }
        ],
    };
