import type IGroup from '../model/IGroup';
import type IGroupProduct from '../model/IGroupProduct';
import type IProductBrief from '../model/IProductBrief';

const img = (seed: string) => `https://picsum.photos/seed/${seed}/300/360`;

const groups: Array<IGroup> = [
    { id: '1', name: 'Ігри', description: 'Get your game on', slug: 'game', imageUrl: img('group1') },
    { id: '2', name: 'Джинси', description: 'Shop Fashion for less', slug: 'jeans', imageUrl: img('group2') },
    { id: '3', name: 'Годинники', description: 'Wireless Tech', slug: 'watches', imageUrl: img('group3') },
    { id: '4', name: 'Смартфони', description: 'Wireless Tech', slug: 'smartphones', imageUrl: img('group4') },
    { id: '5', name: 'Планшети', description: 'Wireless Tech', slug: 'tablets', imageUrl: img('group5') },
    { id: '6', name: 'Навушники', description: 'Wireless Tech', slug: 'headphones', imageUrl: img('group6') },
    { id: '7', name: 'ПК', description: 'Deals on top categories', slug: 'pc', imageUrl: img('group7') },
    { id: '8', name: 'Чоловікам', description: 'Most-loved watches', slug: 'men-watches', imageUrl: img('group8') },
    { id: '9', name: 'Ноутбуки', description: 'Level up your PC here', slug: 'laptops', imageUrl: img('group9') },
    { id: '10', name: 'Спорядження', description: 'Gear up to get fit', slug: 'equipment', imageUrl: img('group10') },
    { id: '11', name: 'Кухня', description: 'New home arrivals under $50', slug: 'kitchen_dining', imageUrl: img('group11') },
];

// Д.З.: масив товарів для групи, що збігається з номером у групі (№4 — Смартфони).
// Ідентифікація: номер групи - тире - номер товару (4-1, 4-2, ...).
// Реалізовано комбінації "пропусків" необов'язкових полів.
const smartphones: Array<IProductBrief> = [
    {
        id: '4-1',
        name: 'Apple iPhone 16 Pro',
        description: '6.3" Super Retina XDR, A18 Pro, 256 ГБ, титановий корпус, камера 48 Мп',
        slug: 'iphone-16-pro',
        imageUrl: img('phone41'),
        price: 1199.0,
        stock: 12,
    },
    {
        id: '4-2',
        name: 'Samsung Galaxy S24 Ultra 5G Titanium Enterprise Edition (International Model, Dual SIM)',
        description:
            '6.8" Dynamic AMOLED 2X, 3120×1440, 120 Гц; Snapdragon 8 Gen 3 for Galaxy; вбудований S Pen; квадро-камера 200 Мп з 5× оптичним зумом; акумулятор 5000 мА·год із швидкою зарядкою 45 Вт; захист Corning Gorilla Armor; 12 ГБ RAM / 512 ГБ пам’яті; Galaxy AI із перекладом дзвінків у реальному часі.',
        slug: 'galaxy-s24-ultra',
        imageUrl: img('phone42'),
        price: 1299.99,
        actionPrice: 1099.99,
        stock: 5,
    },
    {
        // без description і slug — перевірка "пропусків"
        id: '4-3',
        name: 'Google Pixel 9',
        imageUrl: img('phone43'),
        price: 799.0,
        stock: 8,
    },
    {
        id: '4-4',
        name: 'Xiaomi 14',
        description: 'Leica-оптика, Snapdragon 8 Gen 3, 12/256 ГБ',
        slug: 'xiaomi-14',
        imageUrl: img('phone44'),
        price: 749.5,
        actionPrice: 699.0,
    },
    {
        id: '4-5',
        name: 'OnePlus 12',
        description: 'Hasselblad-камера, 120 Гц, 5400 мА·год',
        imageUrl: img('phone45'),
        price: 699.99,
        stock: -1, // немає обмеження
    },
    {
        // мінімальний набір полів
        id: '4-6',
        name: 'Nothing Phone (2a)',
        price: 349.0,
    },
    {
        id: '4-7',
        name: 'Motorola Edge 50 Pro',
        description: '144 Гц pOLED, 125 Вт TurboPower зарядка',
        slug: 'moto-edge-50-pro',
        imageUrl: img('phone47'),
        price: 499.0,
        actionPrice: 449.0,
        stock: 20,
    },
    {
        id: '4-8',
        name: 'Realme GT 6',
        imageUrl: img('phone48'),
        price: 529.0,
        stock: 0, // немає в наявності
    },
    {
        id: '4-9',
        name: 'OPPO Find X7',
        description: 'MediaTek Dimensity 9300, 5000 мА·год, 100 Вт',
        slug: 'oppo-find-x7',
        imageUrl: img('phone49'),
        price: 899.0,
    },
    {
        id: '4-10',
        name: 'Asus ROG Phone 8',
        description: 'Ігровий флагман: 165 Гц AMOLED, активне охолодження AeroActive',
        slug: 'rog-phone-8',
        imageUrl: img('phone410'),
        price: 1099.0,
        actionPrice: 999.0,
        stock: 3,
    },
];

const groupProducts: Record<string, IGroupProduct> = {
    smartphones: {
        group: groups[3],
        products: smartphones,
    },
};

export default class GroupApi {
    static allGroups(): Promise<Array<IGroup>> {
        return new Promise<Array<IGroup>>((resolve) => {
            setTimeout(() => resolve(groups), 400);
        });
    }

    static groupDetails(slug: string): Promise<IGroupProduct> {
        return new Promise<IGroupProduct>((resolve, reject) => {
            setTimeout(() => {
                const group = groups.find((g) => g.slug === slug);
                if (group) {
                    resolve({
                        group,
                        products: groupProducts[slug]?.products ?? [],
                    });
                } else {
                    reject('Not Found');
                }
            }, 400);
        });
    }
}
