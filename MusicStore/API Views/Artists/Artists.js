//Artists js


function getArtistsData(uriAr) {
    // Send an AJAX request
    $.getJSON(uriAr)
        .done(function (data) {
            // On success, 'data' contains a list of products.
            $.each(data,
                function (key, item) {
                    // Add a list item for the product.
                    var card = '<div class="card ml-4 mt-2 pb-2" style="width: 10rem;">' +
                        '<img class="card-img-top" src="' +
                        item.Picture +
                        '" alt="Card image cap">' +
                        '<div class="card-block">' +
                        '<h4 class="card-title">' +
                        item.Name +
                        '</h4>' +
                        '<a href="' +
                        'https://localhost:44332/API%20Views/Artists/Details.html?id=' +
                        item.ArtistId +
                        '" class="btn btn-primary">Go to artist</a>' +
                        '</div></div>';
                    $(card).appendTo($('#Artists'));
                });
        });
}

//Create js

function ajaxCreatePost(uriAr) {

    // PREPARE FORM DATA
    var formData = {
        Name: $("#name").val(),
        Bio: $("#bio").val(),
        Origin: $("#origin").val(),
        Picture: $('#picture').val()
    }

    // DO POST
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: uriAr,
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (result, statusText, xhr) {
            if (xhr.status === 201)
                alert('The artist has been created!');
        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });

}

//Delete js


function getDeleteData(uriAr) {

    $.getJSON(uriAr)
        .done(function (data) {
            $('#ArtisName').append(data.Name);
            $('#ArtisBio').append(data.Bio);
            $('#ArtistPicture').attr('src', data.Picture);
            $('#ArtistOrigin').append(data.Origin);

        });
}

function ajaxArtistsDelete(uriAr) {

    $.ajax({
        type: "DELETE",
        url: uriAr,
        success: function (result, statusText, xhr) {
            if (xhr.status === 200)
                alert('The artist has been deleted!');
            window.location.replace("Artists.html");

        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });
}

//Details js

function getDetailsData(uriAr, uriAl, id) {
    $.getJSON(uriAr)
        .done(function (data) {
            $('#ArtisName').append(data.Name);
            $('#ArtisBio').append(data.Bio);
            $('#ArtistPicture').attr('src', data.Picture);
            $('#ArtistOrigin').append(data.Origin);
            $('#edit').attr('href', 'https://localhost:44332/API%20Views/Artists/Edit.html?id=' + id);
            $('#delete').attr('href', 'https://localhost:44332/API%20Views/Artists/Delete.html?id=' + id);
            $.each(data.Albums,
                function (key, item) {
                    var card = '<div class="card ml-4 mt-2 pb-2" style="width: 10rem;">' +
                        '<img class="card-img-top" src="' +
                        item.Poster +
                        '" alt="Card image cap">' +
                        '<div class="card-block">' +
                        '<h4 class="card-title">' +
                        item.Title +
                        '</h4>' +
                        '<a href="../Albums/Details.html?id='+item.AlbumId+'" class="btn btn-primary">Go to album</a>' +
                        '</div></div>';
                    $(card).appendTo($('#Albums'));
                });
        });
}

//Edit js

function getEditData(uriAr) {
    $.getJSON(uriAr)
        .done(function (data) {
            $('#name').val(data.Name);
            $('#bio').val(data.Bio);
            $('#origin').val(data.Origin);
            $('#picture').val(data.Picture);
        });
}

function ajaxArtistsPut(uriAr, id) {

    // PREPARE FORM DATA
    var formData = {
        ArtistId: id,
        Name: $("#name").val(),
        Bio: $("#bio").val(),
        Origin: $("#origin").val(),
        Picture: $('#picture').val()
    }

    // DO POST
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: uriAr,
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (result, statusText, xhr) {
            if (xhr.status === 201)
                alert('The artist has been updated!');
            location.reload();

        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });

}