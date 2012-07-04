jquery-flot-smoothing
=====================

Jquery flot plugin for smoothing line (with xaxis mode time)
by Vladimir Panitskiy

Example:

    $(function () {
        var options = {
            smoothing: {
                enable: true,
                rate: 0.5
            }
        };
        $.plot($("#placeholder"),
           yourData,
           options);
        );
    });

Usage:

* enable:
    a boolean for enable/disable smoothing (default: false)

* rate:
    value of smoothing rate for the line from 0 to 1 (default: 0.5)
