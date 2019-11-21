function validate() {
    var doc = document.getElementById("wt")
    var reg2 = /\d+[.]?/
    if (reg2.test(doc.value) != true) {
        document.getElementById("bad").innerHTML = "Please type numbers."
        return false
    }
}   