$(document).ready(function () {
    var url = 'https://unreal-xamarin.azurewebsites.net/api/GithubHash/GetHash';
    $.get(url)
        .success(function (data) {
        $("#originalHash").html(data.githubHash);
        $("#hash-link").attr("href", "https://github.com/EpicGames/UnrealEngine/commit/" + data.githubHash);
        $("#hash-link").html("https://github.com/EpicGames/UnrealEngine/commit/" + data.githubHash);
        $("#originalHashInput").val(data.githubHash);
        })
        .error(function (data) {
            $("#originalHash").html("Failed to get Github commit hash");
        });
});

var submitForm = function () {
    $('#msg').html("Verifying your hash...");
    $.ajax({
        type: 'POST',
        url: $("#form").attr('action'),
        data: $("#form").serialize(),
        dataType: 'json',
        success: function(json) {
            if (json.type == 'success') {
                $('#msg').css("color", "green").html(json.message);
            } else if (json.type == 'error') {
                $('#msg').css("color", "red").html(json.message);
            }
        },
        error: function() {
            $('#msg').css("color", "red").html("Failed to send the form. :-(");
        }
    });
    return false;
};