//Albums js
function getAlbumsData(uriAl) {
    // Send an AJAX request
    $.getJSON(uriAl)
        .done(function (data) {
            // On success, 'data' contains a list of products.
            $.each(data,
                function (key, item) {
                    // Add a list item for the product.
                    var card = '<div class="card ml-4 mt-2 pb-2" style="width: 10rem;">' +
                        '<img class="card-img-top" src="' +
                        item.Poster +
                        '" alt="Card image cap">' +
                        '<div class="card-block">' +
                        '<h4 class="card-title">' +
                        item.Title +
                        '</h4>' +
                        '<p>' +
                        item.Artist.Name +
                        '</p>' +
                        '<p>' +
                        item.Price +
                        '$' +
                        '</p>' +
                        '<a href="' +
                        'Details.html?id=' +
                        item.AlbumId +
                        '" class="btn btn-primary">Go to album</a>' +
                        '</div></div>';
                    $(card).appendTo($('#Albums'));
                });
        });
}

//Create js

function ajaxCreatePost(uriAl) {

    // PREPARE FORM DATA
    var formData = {
        Title: $('#title').val(),
        Poster: $('#poster').val(),
        Genre: $('#genre').val(),
        ReleaseDate: $('#releaseDate').val(),
        Price: $('#price').val(),
        ArtistId: $('#artist').val()
    }

    // DO POST
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: uriAl,
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (result, statusText, xhr) {
            if (xhr.status === 201)
                alert('The album has been created!');
        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });

}

function populateArtists(uriAr) {
    $.getJSON(uriAr)
        .done(function (data) {
            // On success, 'data' contains a list of products.
            $.each(data,
                function (key, item) {
                    var option = '<option value="' + item.ArtistId + '">' + item.Name + '</option>';
                    $(option).appendTo($('#artist'));
                });
        });
}

//Delete js
function getDeleteData(uriAl) {
    $.getJSON(uriAl)
        .done(function (data) {
            $('#ArtistName').append(data.Artist.Name);
            $('#Title').append(data.Title);
            $('#Genre').append(data.Genre);
            $('#ReleaseDate').append(data.ReleaseDate);
            $('#Price').append(data.Price);
            $('#AlbumPoster').attr('src', data.Poster);
        });
}

function ajaxDeleteAlbum(uriAl) {

    $.ajax({
        type: "DELETE",
        url: uriAl,
        success: function (result, statusText, xhr) {
            if (xhr.status === 200)
                alert('The album has been deleted!');
            window.location.replace("Albums.html");
        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });
}

//Details js

function getDetailsData(uriAr, id) {
    $.getJSON(uriAr)
        .done(function (data) {
            $('#ArtistName').append(data.Artist.Name);
            $('#Title').append(data.Title);
            $('#Genre').append(data.Genre);
            $('#ReleaseDate').append(data.ReleaseDate);
            $('#Price').append(data.Price);
            $('#AlbumPoster').attr('src', data.Poster);
            $('#edit').attr('href', 'https://localhost:44332/API%20Views/Albums/Edit.html?id=' + id);
            $('#delete').attr('href', 'https://localhost:44332/API%20Views/Albums/Delete.html?id=' + id);
            $.each(data.Songs,
                function (key, item) {
                    var td = '<tr><td><a href="../Songs/Details.html?id='+item.SongId+'">' + item.Title + '</a></td><td>' + item.Length + '</td></tr>'
                    $(td).appendTo($('#TableBody'));
                });
        });
}

//Edit js

function ajaxAlbumsPut(uriAl, id) {

    // PREPARE FORM DATA
    var formData = {
        AlbumId: id,
        Title: $('#title').val(),
        Poster: $('#poster').val(),
        Genre: $('#genre').val(),
        ReleaseDate: $('#releaseDate').val(),
        Price: $('#price').val(),
        ArtistId: $('#artist').val()
    }

    // DO POST
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: uriAl,
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (result, statusText, xhr) {
            if (xhr.status === 201)
                alert('The album has been updated!');
            location.reload();
        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });

}