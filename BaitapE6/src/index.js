import{ getListProductService, deleteByID , addProductService, getListProductByID, updateProduct, callapi} from "./utils/callapi.js";
import Product  from "./models/product.js";

const renderHTML = () => {
    const contentHTML = `
    <div class="card text-white bg-dark">
    <div class="card-body">
      <h4 class="card-title">Danh sách sản phẩm</h4>
      <div class='container'>
        <div class="row">
          <div class="col-md-3">
            <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
          </div>
          <div class="col-md-3">
            <input id="tenSP" class="form-control" placeholder="Tên SP" />
          </div>
          <div class="col-md-3">
            <input id="gia" class="form-control" placeholder="Giá" />
          </div>
          <div class="col-md-3">
            <input id="hinhAnh" class="form-control" placeholder="Link hình" />
          </div>
        </div>
        <br />
        <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
        <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
      </div>
    </div>
  </div>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên SP</th>
          <th>Giá </th>
          <th>Hình ảnh</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tblDanhSachSanPham">

      </tbody>
    </table>
  </div>
    `;

    document.getElementById("root").innerHTML = contentHTML;

    
};

const renderTable = (listProduct) => {
    if(listProduct && listProduct.length > 0){
        let contentHTML = "";
        listProduct.forEach((product) => {
            console.log(product);
            contentHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.tenSP}</td>
                <td>${product.gia}</td>
                <td>
                    <img src = "${product.hinhAnh}" width = "50">
                </td>
                <td>
                    <button class="btn btn-info" onclick = "editProduct(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick = "deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
            `
        });
        return contentHTML;
    }
}

const renderListProduct = () => {
    callapi("sanPham" , "GET", null)
    .then((result)=> {
        
        //Dom tbody
        document.getElementById("tblDanhSachSanPham").innerHTML = renderTable(result.data);

    })
    .catch((err) => {
        console.log(err);
    })
}
renderHTML();
renderListProduct();

/**
 * delete
 */

window.deleteProduct = deleteProduct;
console.log(window);
 function deleteProduct(id){
    callapi(`sanPham/${id}` , "DELETE", null)
    .then((result) =>{
        console.log(result);
        alert("thanh Cong ");
        renderListProduct();
    })
    .catch((err) => {
        console.log(err);
    })
 }

document.getElementById("btnThem").addEventListener("click", function(){
    const ten = getEle("tenSP").value;
    const gia = getEle("gia").value;
    const anh = getEle("hinhAnh").value;

    const product = new Product("", ten, gia, anh);
    console.log(product);

    callapi(`sanPham` , "POST", product)
    .then((result) => {
        console.log(result);
        alert("them thanh cong");
        renderListProduct();
    })
    .catch((err) => {
        console.log(err);
    })
 });

 function getEle(id){
    return document.getElementById(id);
 }

 /**
  * edit Product
  */
window.editProduct = editProduct;
function editProduct(id){
    callapi(`sanPham/${id}` , "GET", null)
    .then((result) => {
        console.log(result.data);
        
        /**
         * gan tat ca du lieu tra ve ra 4 o input
         */
        getEle("maSP").value = result.data.id;
        getEle("tenSP").value = result.data.tenSP;
        getEle("gia").value = result.data.gia;
        getEle("hinhAnh").value = result.data.hinhAnh;
    })
    .catch((err) => {
        console.log(err);
    })
}

document.getElementById("btnCapNhat").addEventListener("click", function(){
    //dom lay value tu 4 o input
    const id = getEle("maSP").value;
    const ten = getEle("tenSP").value;
    const gia = getEle("gia").value;
    const anh = getEle("hinhAnh").value;

    const product = new Product(id, ten, gia, anh);
    console.log(product);

    callapi("sanPham" , "PUT", product)
    .then((result) => {
        console.log(result);
        alert("update thanh cong");

        renderListProduct();

        getEle("maSP").value = "";
        getEle("tenSP").value = "";
        getEle("gia").value = "";
        getEle("hinhAnh").value = "";
    })
    .catch((err) => {
        console.log(err);
    })
 });

