export const adminMenu = [
    { key: "Bingos", value: "/admin/bingos" },
    { key: "Cursos", value: "/admin/cursos" },

];

const userMenu = [
    { key: "Dashboard", value: "/dashboard", to: ['admin', 'organizador', 'viewer'] },
    { key: "Usuarios", value: "/usuarios", to: ['admin'] },
    { key: "Ingresos", value: "/ingresos", to: ['admin', 'organizador'] },
    { key: "Gastos", value: "/gastos", to: ['admin', 'organizador'] },
];

const menu = [
    { key: "Bingos", value: "bingos" },
    { key: "Usuarios", value: "usuarios" },
    { key: "Cursos", value: "cursos" },
    { key: "Ingresos", value: "ingresos" },
    { key: "Gastos", value: "gastos" },
    { key: "Dashboard", value: "dashboard" },

]

export const getMenu = (role: string) => {
    return userMenu.filter(menu => menu.to.includes(role))
}




export const getKey = (pathname: string) => {

    let key = 'Inicio'
    menu.forEach(m => {
        if (pathname.includes(m.value)) {
            key = m.key
        }
    })
    return key

}