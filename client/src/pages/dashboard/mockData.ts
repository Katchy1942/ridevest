export interface Stat {
    label: string;
    value: string;
    change: number;
    isPositive: boolean;
    trendLabel: string;
}

export interface Delivery {
    id: string;
    customer: string;
    destination: string;
    status: 'Delivered' | 'In Transit' | 'Pending' | 'Cancelled';
    time: string;
    amount: number;
    rider?: string;
}

export interface TopRider {
    id: string;
    name: string;
    deliveries: number;
    rating: number;
    avatar: string;
}

export const statsData: Stat[] = [
    {
        label: "Total Revenue",
        value: "₦4.2M",
        change: 12.5,
        isPositive: true,
        trendLabel: "vs last month"
    },
    {
        label: "Active Deliveries",
        value: "148",
        change: 5.2,
        isPositive: true,
        trendLabel: "vs yesterday"
    },
    {
        label: "Success Rate",
        value: "98.4%",
        change: 0.8,
        isPositive: true,
        trendLabel: "vs last month"
    },
    {
        label: "Idle Riders",
        value: "12",
        change: 2.1,
        isPositive: false,
        trendLabel: "vs yesterday"
    }
];

export const topRiders: TopRider[] = [
    {
        id: "RD-01",
        name: "Emmanuel",
        deliveries: 142,
        rating: 4.9,
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Emmanuel&backgroundColor=059669"
    },
    {
        id: "RD-02",
        name: "Chuks",
        deliveries: 128,
        rating: 4.8,
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Chuks&backgroundColor=0284c7"
    },
    {
        id: "RD-03",
        name: "Sola",
        deliveries: 115,
        rating: 4.7,
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sola&backgroundColor=8b5cf6"
    }
];
