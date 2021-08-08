$(document).ready(function () {
    var data = [];
    $.getJSON("js/clothea.json", function (items) {
        data = items;
        fill_data(data);
    });

    // script for search
    $("#formSearch").submit(function (e) {
        e.preventDefault();

        let search = $("#search").val();
        let re = new RegExp(search, "ig");
        let subdata = data.filter(item => item.title.search(re) >= 0);

        fill_data(subdata);

    })
  

    //lap trinh su kien click filter
    $("input[type=checkbox]").click(function () {

        let cats = $("#chk-clo:checked").map(function () { return $(this).val() }).toArray().toString();
        
        let bras = $("#chek-an:checked").map(function () { return $(this).val() }).toArray().toString();
        console.log(bras);
       
        let subdata = null;

        if(cats.length == 0)
        {
            subdata = data;
            
        }
        else
        {
            subdata = data.filter(item => cats.search(item.cat) >= 0);
        }
        
        if(bras.length > 0)
        {
            
            subdata = subdata.filter(item => bras.search(item.bra) >= 0);
        }
        

        fill_data(subdata); 
    });

});

// fill du lieu voi css 
function fill_data(items) {
    let s = [];

    $.each(items, function (k, row) {
        s.push(`<div class='w3-center'>`);
        s.push(`
                
                <div class="card" class="carousel slide" data-ride="carousel" data-pause="false"
                            data-interval="3000">
                            <div class="carousel-inner">
                                <div class="item active">
                                    <img src="garment_home_img/${row.image1}" alt="">
                                </div>
                                <div class="item">
                                    <img src="garment_home_img/${row.image2}" alt="">
                                </div>
                            </div>
                            <br>
                            <a class="btn btn-default" data-toggle="modal" href='#${row.id}'>View</a>
                            <h1>${row.title}</h1>
                            <p class="price">${row.brand}</p>
                            <p>${row.gender}</p>
                </div>
                <div class="modal fade" id="${row.id}">
        <div class="modal-dialog" >
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>

                <div class="modal-body">

                    <div class="container">

                        <div class="container-fluid">
                            <div class="wrapper row">

                                <div class="preview col-md-4">
                                    <div class="preview-pic tab-content">
                                        <div class="tab-pane active" id="pic-1"><img class="pic-2"
                                                src="garment_home_img/${row.image1}" alt=""
                                                style="max-width: 100%;">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="preview col-md-4">
                                    <div class="preview-pic tab-content">
                                        <div class="tab-pane active" id="pic-1"><img class="pic-2"
                                                src="garment_home_img/${row.image2}" alt=""
                                                style="max-width: 100%;">
                                        </div>
                                    </div>
                                </div>
                                

                                <div class="details col-md-4">
                                    <h3 class="product-title">${row.title}</h3>

                                    <div class="rating">
                                        <div class="stars">
                                            <span class="glyphicon glyphicon-star"></span>
                                            <span class="glyphicon glyphicon-star"></span>
                                            <span class="glyphicon glyphicon-star"></span>
                                            <span class="glyphicon glyphicon-star"></span>
                                            <span class="glyphicon glyphicon-star-empty"></span>
                                        </div>
                                    </div>

                                    <p class="vote"><strong>Brand:</strong>&nbsp;${row.brand} </p>
                                    <p class="vote"><strong>Price:</strong>&nbsp;${row.price} </p>
                                    <p class="vote"><strong>Origin:</strong>&nbsp;${row.origin} </p>
                                    <p class="vote"><strong>Status:</strong>&nbsp;${row.status} </p>
                                    <p class="vote"><strong>Gender:</strong>&nbsp;${row.gender} </p>
                                    <div>
                                        <button class="btn btn-success add">Add to cart</button>
                                    </div>

                                </div>
                                

                            </div>
                        </div>



                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>
                
            </div> </div>`);
    });

    $("#body-data").html(s.join(" "));

    //Alert add to cart
    $(".add").click(function (e) {
        alert("Item successfully added to your cart <3 <3 <3");
    });

    //The slide show continue sliding even when hover
    $('#product10').carousel({
        pause: false
    })

}