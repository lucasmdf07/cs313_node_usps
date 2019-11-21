function letterStamped(weight) {
    if (weight <= 1) {
        return .55
    } else if (weight <= 2) {
        return .70
    } else if (weight <= 3) {
        return .85
    } else {
        return 1.00
    }
}

function letterMetered(weight) {
    if (weight <= 1) {
        return .50
    } else if (weight <= 2) {
        return .65
    } else if (weight <= 3) {
        return .80
    } else {
        return .95
    }
}

function leFlats(weight) {
    if (weight <= 1) {
        return 1.00
    } else if (weight <= 2) {
        return 1.15
    } else if (weight <= 3) {
        return 1.30
    } else if (weight <= 4) {
        return 1.45
    } else if (weight <= 5) {
        return 1.60
    } else if (weight <= 6) {
        return 1.75
    } else if (weight <= 7) {
        return 1.90
    } else if (weight <= 8) {
        return 2.05
    } else if (weight <= 9) {
        return 2.20
    } else if (weight <= 10) {
        return 2.35
    } else if (weight <= 11) {
        return 2.50
    } else if (weight <= 12) {
        return 2.65
    } else {
        return 2.80
    }
}

function firstClass(weight) {
    if (weight <= 4) {
        return 3.66
    } else if (weight <= 8) {
        return 4.39
    } else if (weight <= 12) {
        return 5.19
    } else {
        return 5.71
    }
}

function getParams(req, res) {
    var type = req.query.type
    var weight = parseFloat(req.query.weight)
    var price = 0
    if (type === "letterStamped") {
        if (weight > 3.5) {
            price = leFlats(weight)
        } else {
            price = letterStamped(weight)
        }
    } else if (type === "letterMetered") {
        if (weight > 3.5) {
            price = leFlats(weight)
        } else {
            price = letterMetered(weight)
        }
    } else if (type === "leFlats") {
        price = leFlats(weight)
    } else {
        price = firstClass(weight)
    }

    var params = {
        price: price,
        weight: weight,
        type: type
    }
    res.render("results", params)
}



module.exports = {
    getParams: getParams
};
