//Delete js
function getDeleteData(uriSo) {
    $.getJSON(uriSo)
        .done(function (data) {
            $('#AlbumTitle').append(data.Album.Title);
            $('#Title').append(data.Title);
            $('#Length').append(data.Length);
            $('#AlbumPoster').attr('src', data.Album.Poster);
        });
}



function ajaxDeleteSong(uriSo) {

    $.ajax({
        type: "DELETE",
        url: uriSo,
        success: function (result, statusText, xhr) {
            if (xhr.status === 200)
                alert('The song has been deleted!');
            window.location.replace("Songs.html");
        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });
}
//Details js
function getDetailsData(uriSo,id) {
    $.getJSON(uriSo)
        .done(function (data) {
            $('#AlbumTitle').append(data.Album.Title);
            $('#Title').append(data.Title);
            $('#Length').append(data.Length);
            $('#AlbumPoster').attr('src', data.Album.Poster);
            $('#edit').attr('href', 'https://localhost:44332/API%20Views/Songs/Edit.html?id=' + id);
            $('#delete').attr('href', 'https://localhost:44332/API%20Views/Songs/Delete.html?id=' + id);

        });
}
// Songs js
function getSongsData(uriSo) {
    $.getJSON(uriSo)
        .done(function (data) {
            $.each(data,
                function (key, item) {
                    var td = '<tr><td>' +
                        item.Album.Title +
                        '</td>' +
                        '<td><a href="Details.html?id=' +
                        item.SongId +
                        '">' +
                        item.Title +
                        '</a></td>' +
                        '<td> ' +
                        item.Length +
                        '</td></tr>';
                    $(td).appendTo($('#TableBody'));
                });
        });
}

//Create js

function ajaxCreatePost(uriSo) {

    // PREPARE FORM DATA
    var formData = {
        Title: $('#title').val(),
        Length: $('#length').val(),
        AlbumId: $('#album').val()
    }

    // DO POST
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: uriSo,
        data : JSON.stringify(formData),
        dataType: 'json',
        success: function (result, statusText, xhr) {
            if (xhr.status === 201)
                alert('The song has been created!');
        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });

}

function populateAlbumOptions(uriAl) {
    $.getJSON(uriAl)
        .done(function (data) {
            // On success, 'data' contains a list of products.
            $.each(data,
                function (key, item) {
                    var option = '<option value="' + item.AlbumId + '">' + item.Title + '</option>';
                    $(option).appendTo($('#album'));
                });
        });
}

//Edit js
function ajaxSongsPut(uriSo, id) {

    // PREPARE FORM DATA
    var formData = {
        SongId: id,
        Title: $('#title').val(),
        Length: $('#length').val(),
        AlbumId: $('#album').val()
    }
    // DO POST
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: uriSo,
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (result, statusText, xhr) {
            if (xhr.status === 201)
                alert('The song has been updated!');
            location.reload();
        },
        error: function (err) {
            alert('Bad request ' + err.status);
        }
    });

}