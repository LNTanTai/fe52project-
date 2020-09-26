import {API_URL} from "../../config/index.js";
const callapi =(uri, method = "GET", data) => {
    console.log(API_URL + uri);
    return axios({
        url: API_URL + uri,
        method,
        data,
    });
}

const getListProductService = () =>{
    return axios({
        url: "https://5f5c7a255e3a4d001624940f.mockapi.io/api/sanPham",
        method: "GET",
    });
};

const deleteByID = (id) =>{
    return axios({
        url: `https://5f5c7a255e3a4d001624940f.mockapi.io/api/sanPham/${id}`,
        method: "DELETE",
    });
};

const addProductService = (product) =>{
    return axios({
        url: `https://5f5c7a255e3a4d001624940f.mockapi.io/api/sanPham`,
        method: "POST",
        data: product,
    });
};

const getListProductByID = (id) =>{
    return axios({
        url: `https://5f5c7a255e3a4d001624940f.mockapi.io/api/sanPham/${id}`,
        method: "GET",
    });
};

const updateProduct = (Product) =>{
    return axios({
        url: `https://5f5c7a255e3a4d001624940f.mockapi.io/api/sanPham/${Product.id}`,
        method: "PUT",
        data: Product,
    });
};
export{ getListProductService, deleteByID, addProductService, getListProductByID, updateProduct, callapi};
