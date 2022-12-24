const onboarding_screens = [
    {
        id: 1,
        backgroundImage: require("../assets/images/background_01.png"),
        bannerImage: require("../assets/images/favourite_food.png"),
        title: "Hãy chọn món ăn bạn yêu thích",
        description: "Chúng tôi mang đến cho bạn những món ăn ngon nhất"
    },
    {
        id: 2,
        backgroundImage: require("../assets/images/background_02.png"),
        bannerImage: require("../assets/images/hot_delivery.png"),
        title: "Giao tận nơi, chuyển tận tay",
        description: "Mang đến cho bạn những món ăn ngon nhất, nhanh nhất, tận tay"
    },
    {
        id: 3,
        backgroundImage: require("../assets/images/background_01.png"),
        bannerImage: require("../assets/images/great_food.png"),
        title: "Đặt món ăn ngay",
        description: "Đặt món ăn để thoả mãn cơn đói của bạn"
    }
]

const screens = {
    main_layout: "MainLayout",
    home: "Trang chủ",
    search: "Tìm kiếm",
    cart: "Giỏ hàng",
    favourite: "Yêu thích",
    notification: "Thông báo",
    my_wallet: "Ví của tôi",
}

const bottom_tabs = [
    {
        id: 0,
        label: screens.home,
    },
    {
        id: 1,
        label: screens.search,
    },
    {
        id: 2,
        label: screens.cart,
    },
    {
        id: 3,
        label: screens.favourite,
    },
    {
        id: 4,
        label: screens.notification,
    },
]

const delivery_time = [
    {
        id: 1,
        label: "10 Mins",
    },
    {
        id: 2,
        label: "20 Mins"
    },
    {
        id: 3,
        label: "30 Mins"
    }
]

const ratings = [
    {
        id: 1,
        label: 1,
    },
    {
        id: 2,
        label: 2,
    },
    {
        id: 3,
        label: 3,
    },
    {
        id: 4,
        label: 4,
    },
    {
        id: 5,
        label: 5,
    }
]

const tags = [
    {
        id: 1,
        label: "Burger"
    },
    {
        id: 2,
        label: "Fast Food"
    },
    {
        id: 3,
        label: "Pizza"
    },
    {
        id: 4,
        label: "Asian"
    },
    {
        id: 5,
        label: "Dessert"
    },
    {
        id: 6,
        label: "Breakfast"
    },
    {
        id: 7,
        label: "Vegetable"
    },
    {
        id: 8,
        label: "Taccos"
    }
]

const track_order_status = [
    {
        id: 1,
        title: "Order Confirmed",
        checkOrder: "unverified",
        sub_title: "Đơn hàng bạn đã được shop nhận"
    },
    {
        id: 2,
        title: "Order Prepared",
        checkOrder: "verified",
        sub_title: "Đơn hàng đang được chuẩn bị"
    },
    {
        id: 3,
        title: "Delivery in Progress",
        checkOrder: "in progress",
        sub_title: "Xin vui lòng chờ đợi, đơn hàng đang được giao"
    },
    {
        id: 4,
        title: "Delivered",
        checkOrder: "delivered",
        sub_title: "Đã giao hàng thành công"
    },
    {
        id: 5,
        title: "Rate Us",
        checkOrder: "rated",
        sub_title: "Hãy đánh giá cho chúng tôi"
    }
]

const GOOGLE_MAP_API_KEY = ""

export default {
    onboarding_screens,
    screens,
    bottom_tabs,
    delivery_time,
    ratings,
    tags,
    track_order_status,
    GOOGLE_MAP_API_KEY,
}