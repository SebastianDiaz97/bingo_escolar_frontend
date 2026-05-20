export type User = {
    id: number
    name: string,
    email: string,
}

export type RegisterForm = Pick<User, 'name' | 'email'> & {
    password: string,
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string,
}

export type UserData = Pick<User, 'name' | 'email'> & {
    role: string,
    id: number,
    totalBingo: number
}

export type UsersBingo = Pick<User, 'email' | 'id' | 'name'> & {
    role: string
}

export type BingoData = {
    bingoId: number,
    role: string,
    bingo: {
        id: number,
        date: Date,
        description: string
    }
}

export type CourseData = {
    id: number,
    name: string
}

export type Bingo = {
    id: number
    name: string,
    date: Date,
    description: string,
    coursesGoal: number | string,
    state: boolean,
    role: string,
    createdBy: string
}

export type BingoForm = Pick<Bingo, 'name' | 'date' | 'description' | 'coursesGoal'>
export type BingoFormChange = Pick<Bingo, 'name' | 'description' | 'coursesGoal'> & {
    date: string
}

type SummaryDashboard = {
    totalIncome: number,
    totalExpense: number,
    balance: number,
    pendingExpenses: number,
    paidExpenses: number,
    incomeCount: number,
    expenseCount: number,
    totalCourse: number,
    totalGeneral: number
}

export type DataCategoryDashboard = {
    category: string,
    total: number
}
export type CourseDashboard = {
    courseId: number,
    courseName: string,
    goal: number,
    raised: number,
    progress: number
}
type ActivityDashboard = {
    type: string,
    description: string,
    amount: number,
    date: Date
}
type PendingDashboard = {
    description: string,
    amount: number,
}
export type Dashboard = {
    name: string,
    date: Date,
    description: string
    data: {
        summary: SummaryDashboard,
        incomeByCategory: DataCategoryDashboard[],
        expenseByCategory: DataCategoryDashboard[],
        courses: CourseDashboard[],
        recentActivity: ActivityDashboard[],
        pendingExpenses: PendingDashboard[]
    }

}

export type Income = {
    id: number,
    description: string,
    category: string,
    amount: number,
    date: Date
    paymentMethod: string,
    courseId: number | null,
    courseName: string | null
}
export type Expense = {
    id: number,
    description: string,
    category: string,
    amount: number,
    state: string,
    date: Date
}

export type Movements = {
    // id: number,
    description: string,
    category: string,
    amount: number | string,
    date: string,
    paymentMethod?: string,
    courseId?: number | string,
    courseName?: string,
    state?: string,
}

export const CATEGORY_INCOMES = [
    'entradas',
    'donacion',
    'stand',
    'otros'
] as const
// export type CategoryIncomes = typeof CATEGORY_INCOMES[number]

export const PAYMENT_METHOD = [
    'efectivo',
    'transferencia'
] as const
// export type PaymentMethod = typeof PAYMENT_METHOD[number]

export const CATEGORY_EXPENSES = [
    'premios',
    'cartones',
    'entradas',
    'decoracion',
    'equipamiento',
    'publicidad',
    'música',
    'otros'
] as const
// export type CategoryExpense = typeof CATEGORY_EXPENSES[number]