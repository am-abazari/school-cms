module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                '225': '56.25rem',
                '240': '60rem',
                '137.5': '34.375rem',
                '105': '26.25rem',
                '115': '29rem',
                'hfull': 'calc(100% - 50px)'
            },
            colors: {
                primary: "#064B9D",
                secondry: "#2D3542",

                bg_light: {
                    100: "#FFFFFF",
                    200: "#ECEDF3",
                },
                text_light :{
                    100:"#636363",
                },

                bg_dark: {
                    50: "#283046",
                    100: "#1F2937",
                    200: "#18202F",
                },
                tags: "#5F58C3",
                actives: "#635CCC",
                btns: "#7367F0",
                texts: "#EFEEFC",
                bg: "#161D31",
            },
            fontFamily: {
                Shabnam: ['Shabnam'],
                Shabnam_Bold: ['Shabnam-Bold'],
                Shabnam_Thin: ['Shabnam-Thin'],
                Shabnam_Light: ['Shabnam-Light'],
                Shabnam_Medium: ['Shabnam-Medium'],
            }

        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#22c55e",

                    "secondary": "#facc15",

                    "accent": "#dc2626",



                    "neutral": "#191D24",

                    "base-100": "#2A303C",

                    "info": "#3ABFF8",

                    "success": "#36D399",

                    "warning": "#FBBD23",

                    "error": "#F87272",

                },
            },
        ],
    },
    plugins: [require("daisyui")],

}
