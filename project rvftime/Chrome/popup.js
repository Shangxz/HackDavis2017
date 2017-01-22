$(function() {
chrome.storage.sync.get('rvftimeSyncKey',
    function(object){
        if(object.rvftimeSyncKey && object.rvftimeSyncKey != "") {
            showControlPage();
        }
});
$('#loginBtn').on(
    'click', function() {
        if ( $( "#emailField" ).val() != "" && $( "#pwField" ).val() != "") {
        $.ajax({
            url: 'http://localhost/login',
            type: 'post',
            data: {
                email:  $( "#emailField" ).val(), 
                password: $( "#pwField" ).val()
            },
            dataType: 'json',
            success: function (data) {
                console.log(JSON.stringify(data));
                chrome.storage.sync.set({"rvftimeSyncKey": data.local._chromeData}, 
                    function() {
                        console.log('Account Chrome Database Saved ');
                        showControlPage();
                    }
                );
            }
        });
    }
})

$('#logoutBtn').on(
    'click', function() {
        chrome.storage.sync.set({"rvftimeSyncKey": ""}, 
             function() {
                  console.log('Account Chrome Database Deleted ');
                  $("#loginForm").show();
                    $("#staticFrame").hide();
             }
        );
})
})
function showControlPage() {
    $("#loginForm").hide();
    $("#staticFrame").show();
    
}