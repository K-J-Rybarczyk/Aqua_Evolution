var Cell = function(xpozycja, ypozycja) {
    var x = xpozycja,
        y = ypozycja,
        id,
        maxSpeed = 2;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };


    var update = function(keys) {
        // Previous position
        var prevX = x,
            prevY = y;

        if (keys.up) {
            y -= maxSpeed;
        } else if (keys.down) {
            y += maxSpeed;
        };

        if (keys.left) {
            x -= maxSpeed;
        } else if (keys.right) {
            x += maxSpeed;
        };

        return (prevX != x || prevY != y) ? true : false;
    };

    // Draw player
    var draw = function(ctx) {
        ctx.fillRect(x-5, y-5, 10, 10);
    };


    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        update: update,
        draw: draw
    }
};