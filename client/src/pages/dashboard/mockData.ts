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

export interface PaymentStat {
    title: string;
    amount: string;
    description: string;
    trend: number;
    iconType: 'wallet' | 'inflow' | 'outflow' | 'pending';
}

export interface PaymentTransaction {
    id: string;
    reference: string;
    date: string;
    type: 'Weekly Payout' | 'Commission' | 'Fuel Advance' | 'Maintenance Deduction' | 'Remittance';
    amount: number;
    status: 'Successful' | 'Pending' | 'Failed';
    method: 'Opay' | 'Moniepoint' | 'GTBank' | 'Wallet Deduction';
    recipient: string;
}

export interface FinancialChartData {
    day: string;
    inflow: number;
    outflow: number;
}

export const paymentStats: PaymentStat[] = [
    {
        title: "Total Balance",
        amount: "₦1,245,000",
        description: "Available for withdrawal",
        trend: 8.4,
        iconType: 'wallet'
    },
    {
        title: "Total Earnings",
        amount: "₦4,850,500",
        description: "This month",
        trend: 12.5,
        iconType: 'inflow'
    },
    {
        title: "Pending Payouts",
        amount: "₦345,000",
        description: "Processing for 12 riders",
        trend: 0,
        iconType: 'pending'
    }
];

export const financialChartData: FinancialChartData[] = [
    { day: "Mon", inflow: 120000, outflow: 45000 },
    { day: "Tue", inflow: 150000, outflow: 30000 },
    { day: "Wed", inflow: 95000, outflow: 20000 },
    { day: "Thu", inflow: 180000, outflow: 60000 },
    { day: "Fri", inflow: 210000, outflow: 120000 },
    { day: "Sat", inflow: 340000, outflow: 80000 },
    { day: "Sun", inflow: 290000, outflow: 50000 },
];

export const recentTransactions: PaymentTransaction[] = [
    {
        id: "TX-9901",
        reference: "REF-OP-829103",
        date: "2026-04-09T10:23:00",
        type: "Weekly Payout",
        amount: 85000,
        status: "Successful",
        method: "Opay",
        recipient: "Emmanuel John"
    },
    {
        id: "TX-9902",
        reference: "REF-SYS-DEDUCT",
        date: "2026-04-09T09:15:00",
        type: "Fuel Advance",
        amount: 15000,
        status: "Successful",
        method: "Wallet Deduction",
        recipient: "System"
    },
    {
        id: "TX-9903",
        reference: "REF-MP-112345",
        date: "2026-04-08T16:45:00",
        type: "Remittance",
        amount: 40000,
        status: "Pending",
        method: "Moniepoint",
        recipient: "Ridevest LTD Target"
    },
    {
        id: "TX-9904",
        reference: "REF-GTB-554121",
        date: "2026-04-08T14:30:00",
        type: "Weekly Payout",
        amount: 72000,
        status: "Failed",
        method: "GTBank",
        recipient: "Chuks Okonkwo"
    },
    {
        id: "TX-9905",
        reference: "REF-SYS-COMM",
        date: "2026-04-08T12:00:00",
        type: "Commission",
        amount: 12500,
        status: "Successful",
        method: "Wallet Deduction",
        recipient: "System"
    }
];
