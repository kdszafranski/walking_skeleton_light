$(document).ready(function(){
    $('#nameForm').on('submit', function(event){
        event.preventDefault();

        var values = {};

        $.each($('#nameForm').serializeArray(), function(i, field){
            values[field.name] = field.value;
            //values.catName
        });

        $.ajax({
            type: "POST",
            url: "/cat",
            data: values,
            success: function(data){
                console.log(data);
                fetchCats();
            }
        });
    });

    fetchCats();
});

function fetchCats(){
    $.ajax({
        type: "GET",
        url: "/cat",
        success: function(data){

            refreshDom(data);
        }
    })
}

function refreshDom(array){
    $("#catContainer").empty();

    for(var i = 0; i < array.length; i++){
        $("#catContainer").append("<p>" + array[i].name + "</p>")
    }
}