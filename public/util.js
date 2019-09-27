var submitForm = function() {
    var form = document.getElementById('ebook1form');

    // Construct json payload from form
    var data = {
        'email': form.elements[0].value
    }

    var r = new XMLHttpRequest();
    r.open("POST", "/addemail/", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        form.elements[0].value = ""
        window.open("drf_nontech_guide_volumeI.pdf");
    };
    r.setRequestHeader('Content-Type', 'application/json');
    r.send(JSON.stringify(data));
   ;
}
